import React, { useEffect, useReducer, useRef, useState } from "react";
import { RTE } from "./index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import postService from "../appwrite/postService";
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";

export default function PostForm({ post }) {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);
	const [imgsrc, setImgsrc] = useState("");
	const [isPrivate, setIsPrivate] = useState(post?.status || "public");

	const handleCheckboxChange = (e) => {
		const newStatus = e.target.checked ? "public" : "private";
		setIsPrivate(newStatus);
		setValue("status", newStatus);
	};
	const { register, handleSubmit, reset, watch, setValue, control, getValues } = useForm({
		defaultValues: {
			title: post?.title || "",
			// slug: post?.$id || "",
			content: post?.content || "check code: postForm.jsx value of content cant be retreived ",
			status: post?.status || "private",
		},
	});
	const content = getValues("content"); //just using getValues automatically adds the values of RTE into the data object of

	useEffect(() => {
		if (post) {
			console.log("post status"+post.status);
			
			setValue("title", post.title);
			setValue("content", post.content);
			// setValue("status", post.status);
			// setIsPrivate(post.status);
			postService.getFilePreview(post.postImageId).then((e) => {
				setImgsrc(e);
			});
		}
	}, [post, setValue]);
	const submit = async (data) => {
		setLoading(true);
		
		data.status = data.status ? "public" : "private"; //changing data.status coz checkbox returns only boolean
		console.log(data);
		// console.log("userkaData" + userData.$id);
		if (post) {
			const file = data.postImage[0] ? await postService.uploadFile(data.postImage[0]) : null;
			console.log(post);
			if (file) {
				postService.deleteFile(post.postImageId);
			}
			postService.updatePost({ documentId: post.$id, ...data, postImageId: file ? file.$id : post.postImageId }).then((dbPost) => {
				navigate(`/post/${dbPost.$id}`);
			});
			setLoading(false);
			console.log("successfull_post_edited");
			// alert("successfull_post_edited");
			navigate("/all-posts");
		} else {
			const file = await postService.uploadFile(data.postImage[0]);
			if (file) {
				const imageId = file.$id;
				const { postImage, ...restData } = data; // Destructure to exclude postImage
				postService.createPost({ ...restData, postImageId: imageId, userId: userData.$id }).then((dbPost) => {
					// console.log(dbPost);
					navigate(`/post/${dbPost.$id}`);
				});
				setLoading(false);
				// alert("successfull");
				console.log("post added successfully");
			}
		}
		setLoading(false);
	};
	if (post) {
		useEffect(() => {
			postService.getFilePreview(post.postImageId).then((e) => {
				setImgsrc(e);
				console.log(content);
			});
		}, []);
	}

	return loading === false ? (
		<>
			{/* Heads up! 👋 Plugins: - @tailwindcss/forms */}
			<form onSubmit={handleSubmit(submit)}>
				<section className='bg-gray-50 dark:bg-gray-900'>
					<div className='mx-auto max-w-screen-xl h-max px-4 py-5 sm:px-6 lg:px-3'>
						<div className='grid grid-cols-1  lg:grid-cols-5'>
							<div className='grid rounded-lg gap-5 bg-white dark:bg-gray-800 shadow-lg lg:col-start-1 lg:col-end-6 lg:px-20 lg:py-10'>
								<div>
									<label className='sr-only' htmlFor='title'>
										Title
									</label>
									<input {...register("title", { required: !post })} className='w-full rounded-lg border-gray-300 dark:border-gray-700 p-3 text-sm dark:bg-gray-700 dark:text-gray-50' placeholder='Title' type='text' id='title' />
								</div>
								<div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
									<div>
										<label
											htmlFor='status'
											className={`block w-full cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-50 hover:border-black dark:hover:border-white ${
												isPrivate === "private" ? "bg-blue-500/50 text-white" : "bg-green-500/50 text-white"
											}`}
										>
											<input {...register("status")} id='status' type='checkbox' checked={isPrivate === "public"} onClick={handleCheckboxChange} />
											<span className='text-sm'>{isPrivate === "private" ? "Private" : "Public"}</span>
										</label>
									</div>
								</div>
								<div>
									<input label='Post Image :' type='file' className='mb-4' accept='image/png, image/jpg, image/jpeg, image/gif' {...register("postImage")} />
									{post && (
										<div className='w-2/4 mb-4 relative'>
											<img className='object-contain border-2 border-gray-300 rounded-lg p-1' src={imgsrc} alt={post.title} />
										</div>
									)}
								</div>
								<div>
									<RTE name='content' control={control} />
								</div>

								<div className='mt-4'>
									<button type='submit' className='inline-block w-full rounded-lg bg-black dark:bg-white px-5 py-3 font-medium text-white dark:text-black sm:w-auto'>
										{post ? "Update" : "Submit"}
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</form>
		</>
	) : (
		<div className='flex flex-col h-screen justify-center items-center bg-[#111827]'>
			<PulseLoader color='#367bd6' size={15} />
			<div className='font-medium text-2xl text-[#367bd6] mt-5'>Good things takes time.....🧑‍🍳</div>
		</div>
	);
}
