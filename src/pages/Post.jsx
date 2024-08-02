import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/postService";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

export default function Post() {
	const [post, setPost] = useState(null);
	const [imgsrc, setImgsrc] = useState("");
	const { slug } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const userData = useSelector((state) => state.auth.userData);

	const isAuthor = post && userData ? post.userId === userData.$id : false;

	useEffect(() => {
		if (slug) {
			postService.getPost(slug).then((post) => {
				if (post) {
					setPost(post);
					postService.getFilePreview(post.postImageId).then((e) => {
						setImgsrc(e);
						// console.log(e);
					});
					setLoading(false);
				} else {
					navigate("/");
					setLoading(false);
				}
			});
		} else {
			navigate("/");
			setLoading(false);
		}
	}, [slug, navigate]);

	const deletePost = () => {
		postService.deletePost(post.$id).then((status) => {
			if (status) {
				console.log(post.postImageId);
				postService.deleteFile(post.postImageId);
				navigate("/all-posts");
			}
		});
	};

	return loading === false && post ? (
		<div className='py-8 px-4 max-w-3xl mx-auto flex flex-col'>
			<div className='w-full mb-6 '>
				<h1 className='text-5xl font-bold text-left text-[#c7d3e0]'>{post.title}</h1>
			</div>
			{isAuthor && (
				<div className=' flex space-x-2 self-end mb-3'>
					<Link to={`/edit-post/${post.$id}`}>
						<button className='px-4 py-1 text-sm border-blue-500 border hover:text-blue-300 text-blue-500 rounded shadow-lg  transition-colors duration-300'>Edit</button>
					</Link>
					<button className='px-3 py-1 text-sm border-red-500 border hover:text-red-300 text-red-500 rounded shadow-lg  transition-colors duration-300' onClick={deletePost}>
						Delete
					</button>
				</div>
			)}
			<div className='w-full flex flex-col items-center mb-4 relative'>
				{/* <div className='w-full aspect-w-16 aspect-h-9'> */}
				<img className='w-full max-h-80 object-cover' loading="lazy" src={imgsrc} alt={post.title} />
				{/* </div> */}
			</div>

			<div className='w-full prose max-w-none text-[#a8b9c4]'>{parse(post.content)}</div>
		</div>
	) : (
		<div className='flex flex-col h-screen justify-center items-center bg-[#111827]'>
			<PulseLoader color='#367bd6' size={15} />
			<div className='font-medium text-2xl text-[#367bd6] mt-5'>Good things takes time.....🧑‍🍳</div>
		</div>
	);
}
