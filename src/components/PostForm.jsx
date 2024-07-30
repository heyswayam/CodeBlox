import React, { useReducer, useRef, useState } from "react";
import { RTE } from "./index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import postService from "../appwrite/postService";
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";

export default function PostForm({ post }) {
	// const ref = useRef(0);
	const [loading,setLoading] = useState(false);
	const { register, handleSubmit, reset, watch, setValue, control, getValues } = useForm({
		defaultValues: {
			title: post?.title || "",
			// slug: post?.$id || "",
			content: post?.content || "check code: postForm.jsx value of content cant be retreived ",
			status: post?.status || "active",
		},
	});
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);

	const content = getValues('content');  //just using getValues automatically adds the values of RTE into the data object of
	
	const submit = async (data) => {
		setLoading(true);
		// console.log("userkaData" + userData.$id);
		if (post) {
			const file = data.postImage[0] ? postService.uploadFile(data.postImage[0]) : null;
			if (file) {
				postService.deleteFile(post.postImageId);
			}
			const dbPost = await postService.updatePost(post.$id, {
				...data,
				postImageId: file ? file.$id : undefined,
			});
			if (dbPost) {
				navigate(`/post/${dbPost.$id}`);
			}
			console.log("post??????");
			console.log(post);
		} else {
			const file = await postService.uploadFile(data.postImage[0]);
			// console.log(data);
			// console.log(file);
			if (file) {
				const imageId = file.$id;
				const { postImage, ...restData } = data; // Destructure to exclude postImage
				const dbPost = await postService.createPost({ ...restData, postImageId:imageId, userId: userData.$id });
				// console.log(restData);
				if (dbPost) {
					// navigate(`/post/${dbPost.userId}`);
				}
			}
		}
		// reset();
		alert("successfull")
		setLoading(false);
	};

	return loading===false ?  (
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
											htmlFor='Option1'
											className='block w-full cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-50 hover:border-black dark:hover:border-white has-[:checked]:border-black dark:has-[:checked]:border-white has-[:checked]:bg-black dark:has-[:checked]:bg-gray-300 has-[:checked]:text-white dark:has-[:checked]:text-black'
											tabIndex='0'
										>
											<input {...register("status", { required: !post })} className='sr-only' id='Option1' type='radio' tabIndex='-1' />

											<span className='text-sm'> Option 1 </span>
										</label>
									</div>
								</div>
								<div>
									<input label='Post Image :' type='file' className='mb-4' accept='image/png, image/jpg, image/jpeg, image/gif' {...register("postImage",  )} />
									{post && (
										<div className='w-full mb-4'>
											<img src={postService.getFilePreview(post.postImageId)} alt={post.title} className='rounded-lg' />
										</div>
									)}
								</div>
								<div>
									<RTE name="content" control={control} />
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
	): (
		<div className='flex flex-col h-screen justify-center items-center bg-[#111827]'>
			<PulseLoader color='#367bd6' size={15} />
			<div className='font-medium text-2xl text-[#367bd6] mt-5'>Good things takes time.....🧑‍🍳</div>
		</div>
	);
}
