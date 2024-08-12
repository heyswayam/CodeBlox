import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/postService";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { MetaDecorator } from "../components/index";
import { toast } from "sonner";
import { setLoader } from "../context/loaderSlice";

export default function Post() {
	const [post, setPost] = useState(null);
	const [imgsrc, setImgsrc] = useState("");
	const { slug } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const userData = useSelector((state) => state.auth.userData);
	const dispatch = useDispatch();
	const mode = useSelector((state) => state.theme.mode);
	const isAuthor = post && userData ? post.userId === userData.$id : false;
	const truncateHTML = (html) => {
		//have hardcoded charLimit = 50
		const text = html.replace(/<[^>]+>|&nbsp;|&[a-zA-Z]+;/g, ""); // Remove HTML tags and HTML entities like &nbsp; &amp;, &lt;, &gt;
		return text.length > 90 ? text.slice(0, 90) + "..." : text;
	};
	useEffect(() => {
		if (slug) {
			//convert to try catch someday
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

	const deletePost = async () => {
		try {
			dispatch(setLoader(true));
			const status = await postService.deletePost(post.$id);
			if (status) {
				await postService.deleteFile(post.postImageId);
				toast.success("Post deleted successfully", {
					position: "bottom-right",
				});
				navigate("/all-posts");
				dispatch(setLoader(false));
			} else {
				toast.error("Failed to delete post", {
					position: "bottom-right",
				});
			}
		} catch (e) {
			toast.error("Error deleting post: " + e.message, {
				position: "bottom-right",
			});
			dispatch(setLoader(false));
		}
	};
	useEffect(() => {
		console.log(post);
	}, [post]);
	return loading === false && post ? (
		<>
			<MetaDecorator title={post.title} description={truncateHTML(post.content)} imageUrl={imgsrc} siteUrl={window.location.href} />
			<div className='py-8 px-4 max-w-3xl mx-auto flex flex-col'>
				<div className='w-full mb-6 flex flex-col '>
					<p className='text-5xl text-center font-heading  text-text '>{post.title}</p>
				</div>
				<div className='w-9/12 flex lg:self-center justify-between my-3'>
						<div className='flex'>
							<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke={mode === "light" ? "#5e5e5e" : "#d5d5d5"} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-user h-4 self-center'>
								<path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
								<circle cx='12' cy='7' r='4' />
							</svg>
							<span className='text-md text-[#5e5e5e] dark:text-[#d5d5d5]'>{post.author}</span>
						</div>
						<div className='flex'>
							<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke={mode === "light" ? "#5e5e5e" : "#d5d5d5"} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' class='lucide lucide-calendar-plus h-4 self-center'>
								<path d='M8 2v4' />
								<path d='M16 2v4' />
								<path d='M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8' />
								<path d='M3 10h18' />
								<path d='M16 19h6' />
								<path d='M19 16v6' />
							</svg>
							<span className='text-md text-[#5e5e5e] dark:text-[#d5d5d5]'>{new Date(post.$createdAt).toLocaleDateString()}</span>
						</div>
						<div className='flex'>
							<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke={mode === "light" ? "#5e5e5e" : "#d5d5d5"} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' class='lucide lucide-calendar-arrow-up  h-4 self-center'>
								<path d='m14 18 4-4 4 4' />
								<path d='M16 2v4' />
								<path d='M18 22v-8' />
								<path d='M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9' />
								<path d='M3 10h18' />
								<path d='M8 2v4' />
							</svg>
							<span className='text-md text-[#5e5e5e] dark:text-[#d5d5d5]'>{new Date(post.$updatedAt).toLocaleDateString()}</span>
						</div>

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
					<img className='w-full max-h-80 object-cover' loading='lazy' src={imgsrc} alt={post.title} />
					{/* </div> */}
				</div>

				<div className='w-full leading-loose max-w-none text-text font-sw font-body'>{parse(post.content)}</div>
			</div>
		</>
	) : (
		<div className='flex flex-col h-screen justify-center items-center  bg-background'>
			<PulseLoader color='#7850de' size={15} />
		</div>
	);
}
