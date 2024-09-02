import React, { useEffect, useState, useCallback, useRef } from "react";
import { RTE } from "./index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import postService from "../appwrite/postService";
import { useForm } from "react-hook-form";
import { PulseLoader, SyncLoader } from "react-spinners";
import { toast } from "sonner";

import conf_env from "../conf_env/conf_env";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function PostForm({ post }) {
	const [loading, setLoading] = useState(false);
	const [genAiLoading, setGenAiLoading] = useState(false);
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);
	// const [imgsrc, setImgsrc] = useState("");	//it wasn't doing any thing but too scared to delete it lol
	const [mode, setMode] = useState(post?.status || "public");
	const [dragActive, setDragActive] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);

	const handleRadioChange = () => {
		const newMode = mode === "public" ? "private" : "public";
		setMode(newMode);
		setValue("status", newMode);
		// console.log("New mode:", newMode);
	};
	const { register, handleSubmit, reset, watch, setValue, control, getValues } = useForm({
		defaultValues: {
			title: post?.title || "",
			content: post?.content || "Write your own blog article from scratch...",
			status: post?.status || mode,
		},
	});
	const content = getValues("content"); //just using getValues automatically adds the values of RTE into the data object of

	useEffect(() => {
		if (post) {
			// console.log("post status: " + post.status);
			setValue("title", post.title);
			setValue("content", post.content);
			setValue("status", post.status);
			setMode(post.status);
			postService.getFilePreview(post.postImageId).then((e) => {
				// setImgsrc(e); 	//it wasn't doing any thing but too scared to delete it lol
				setPreviewImage(e);
			});
		}
	}, [post, setValue]);

	const inputRef = useRef(null);

	const handleAiGeneration = (event) => {
		event.preventDefault();
		setGenAiLoading(true);
		// using api key from genAi gemini google cloud project
		const genAI = new GoogleGenerativeAI(conf_env.geminiApi);
		console.log(conf_env.geminiApi);
		console.log(conf_env.tinyMCEId);
		
		
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
		(async () => {
			try {
				const prompt = inputRef.current.value;
				const result = await model.generateContent(
					"Generate blog article under 500 words if words is not specified. Make the tone like blog article and don't bold any text, write the headline on a new line. The topic to generate the blog article on is mentioned from the next sentence onwards and if there's no next sentence return, please enter your prompt" + prompt,
				);
				console.log(result.response.text());
				
				// console.log(result.response.text());
				setValue("content", result.response.text());
			} catch (err) {
				console.log(err);
			} finally {
				setGenAiLoading(false);
			}
		})();
		// console.log(inputRef.current.value);
	};

	const handleDrag = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	}, []);

	const handleDrop = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFile(e.dataTransfer.files[0]);
		}
	}, []);

	const handleChange = useCallback((e) => {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			handleFile(e.target.files[0]);
		}
	}, []);

	const handleFile = (file) => {
		setValue("postImage", [file]);
		const reader = new FileReader();
		reader.onloadend = () => {
			setPreviewImage(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const submit = async (data) => {
		setLoading(true);
		// console.log(data); /////VERY IMPORTANT CONSOLE LOG. HELPS YOU TO SEE THE SUBMITED DATA ////////*********/
		data.status = data.status ? "public" : "private";
		if (!data.postImage || data.postImage.length === 0) {
            toast.error("Please upload an image.", {
                position: "bottom-right",
            });
            setLoading(false);
            return;
        }
		if (post) {
			try {
				setLoading(true);

				const file = data.postImage[0] ? await postService.uploadFile(data.postImage[0]) : false;
				// console.log(post);
				if (file) {
					postService.deleteFile(post.postImageId);
				}
				postService.updatePost({ documentId: post.$id, ...data, postImageId: file ? file.$id : post.postImageId }).then((dbPost) => {
					toast.success("Post edited successfully", {
						position: "bottom-right",
					});
					setLoading(false);

					navigate(`/post/${dbPost.$id}`);
				});
			} catch (e) {
				toast.error("Error updating post: " + e.message, {
					position: "bottom-right",
				});
				dispatch(setLoader(false));
				navigate("/all-posts");
				setLoading(false);
			}
			// console.log("successfull_post_edited");
		} else {
			try {
				const file = data.postImage[0] ? await postService.uploadFile(data.postImage[0]) : false;
				if (file) {
					const imageId = file.$id;
					const { postImage, ...restData } = data;
					postService.createPost({ ...restData, postImageId: imageId, userId: userData.$id, author: userData.name }).then((dbPost) => {
						navigate(`/post/${dbPost.$id}`);
					});
					toast.success("Post added successfully", {
						position: "bottom-right",
					});
					// console.log("post added successfully");
				}
				setLoading(false);
			} catch (e) {
				toast.error("Error creating post: " + e.message, {
					position: "bottom-right",
				});

				dispatch(setLoader(false));
			}
		}
	};

	return loading === false ? (
		<>
			{/* Heads up! 👋 Plugins: - @tailwindcss/forms */}
			<form onSubmit={handleSubmit(submit)}>
				<div className='mx-auto max-w-screen-xl h-max px-4 py-5 sm:px-6 lg:px-3 '>
					<div className='grid grid-cols-1  lg:grid-cols-5'>
						<div className='grid rounded-lg gap-5 bg-white dark:bg-slate-900/60 shadow-lg lg:col-start-1 lg:col-end-6 lg:px-20 lg:py-10'>
							<div>
								<label className='sr-only' htmlFor='title'>
									Title
								</label>
								<input {...register("title", { required: !post })} className='w-full rounded-lg border-gray-300 dark:border-gray-700 p-3 text-sm dark:bg-gray-700 text-text placeholder:text-gray-400' placeholder='Enter a catchy title for your blog post' type='text' id='title' />
							</div>
							<div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
								<div>
									<label htmlFor='status' className={`block w-full cursor-pointer rounded-lg  p-3 text-white dark:hover:border-white ${mode === "private" ? "bg-blue-500/80 dark:bg-blue-500/50" : "bg-green-500/80 dark:bg-green-500/50 "}`}>
										<input {...register("status")} id='status' type='checkbox' onChange={handleRadioChange} className='hidden-radio' checked={mode === "public"} />
										<span className='text-sm'>{mode === "private" ? "Private" : "Public"}</span>
									</label>
								</div>
							</div>
							<div>
								<div className='flex items-center justify-center w-full'>
									<label
										htmlFor='dropzone-file'
										className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ${
											dragActive ? "border-blue-500" : ""
										}`}
										onDragEnter={handleDrag}
										onDragLeave={handleDrag}
										onDragOver={handleDrag}
										onDrop={handleDrop}
									>
										{previewImage ? (
											<img src={previewImage} alt='Preview' className='max-h-full max-w-full object-contain' />
										) : (
											<div className='flex flex-col items-center justify-center pt-5 pb-6'>
												<svg className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 16'>
													<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2' />
												</svg>
												<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
													<span className='font-semibold'>Click to upload</span> or drag and drop
												</p>
												<p className='text-xs text-gray-500 dark:text-gray-400'>SVG, PNG, JPG or GIF</p>
												<span className='text-red-500 dark:text-red-500/80 text-xs'> *required</span>
											</div>
										)}
										<input id='dropzone-file' type='file' className='hidden' accept='image/png, image/jpg, image/jpeg, image/gif' {...register("postImage")} onChange={handleChange} />
									</label>
								</div>
							</div>
							<div>
								<div>
									<div className='my-3 flex flex-col justify-between items-center md:flex-row'>
										<label className='sr-only' htmlFor='prompt'>
											prompt
										</label>
										<input className='w-full md:w-10/12 rounded-lg border-gray-300 dark:border-gray-700 p-3 text-sm dark:bg-gray-700 text-text mb-2 md:mb-0 md:mr-2 placeholder:text-gray-400' placeholder='Describe the blog article you want to generate with AI' type='text' id='prompt' ref={inputRef} />
										<button
											onClick={handleAiGeneration}
											className='inline-block w-full md:w-fit rounded-lg bg-accent text-white px-5 py-3 font-medium text-text translate-y-1 bg-gradient-to-br from-purple-600 to-blue-500 transition duration-300 ease-in-out hover:scale-95
        text-sm text-center me-2 mb-2'
										>
											{genAiLoading ? <SyncLoader size={8} color='rgba(255, 255, 255, 0.9)' speedMultiplier={0.8} /> : "Generate"}
										</button>
									</div>
								</div>

								<p className='text-text w-fit mx-auto mb-3'>or</p>
								<RTE name='content' control={control} />
							</div>

							<div className='mt-4'>
								<button type='submit' className={`inline-block w-full rounded-lg bg-accent text-white px-5 py-3 font-medium text-text  sm:w-auto transition-all hover:scale-95 `}>
									{post ? "Update" : "Submit"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	) : (
		<div className='flex flex-col h-screen justify-center items-center bg-background'>
			<PulseLoader color='#7850de' size={15} />
		</div>
	);
}
