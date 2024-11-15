import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import postService from "../appwrite/postService";
import { useSelector } from "react-redux";

function Card({ $id, title, fileid, content, author }) {
	// Helper function to truncate HTML content to the first 50 characters
	const truncateHTML = (html, charLimit) => {
		const text = html.replace(/<[^>]+>|&nbsp;|&[a-zA-Z]+;/g, ""); // Remove HTML tags and HTML entities like &nbsp; &amp;, &lt;, &gt;
		return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
	};
	const [imageAddress, setImageAddress] = useState("");
	const mode = useSelector((state) => state.theme.mode);
	useEffect(() => {
		const fetchImageAddress = async () => {
			try {
				const address = await postService.getFilePreview(fileid);
				setImageAddress(address);
				// console.log(address);
			} catch (error) {
				console.error("Error fetching image address:", error);
			}
		};

		fetchImageAddress();
	}, [fileid]);

	return (
		<div className='max-w-sm flex flex-col overflow-hidden shadow-md border-gray-200 rounded-lg shadow-violet-200 hover:shadow-lg hover:shadow-violet-200 transition-all hover:scale-105 hover:dropdown-shadow dark:shadow-sm dark:hover:shadow-md dark:hover:shadow-violet-900/50 dark:shadow-violet-900 dark:bg-purple-900/10 dark:border-none duration-500'>
			<Link to={`/post/${$id}`}>
				<img className='rounded-t-lg w-full h-60 object-cover' loading='lazy' src={imageAddress} alt={title} />
			</Link>
			<div className='p-5 flex flex-col justify-between h-full'>
				<Link to={`/post/${$id}`}>
					<h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>{title}</h5>
				</Link>
				<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{truncateHTML(content, 50)}</p>
				<div className=" flex items-baseline w-full justify-between">

				<Link to={`/post/${$id}`} className='group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-gray-200'>
					Read more
					<span aria-hidden='true' className='block transition-all group-hover:ms-0.5 rtl:rotate-180'>
						&rarr;
					</span>
				</Link>
				<div className='flex items-center mb-3 text-gray-500 dark:text-gray-400'>
				<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke={mode === "light" ? "#5e5e5e" : "#d5d5d5"} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-user h-4 self-center'>
								<path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
								<circle cx='12' cy='7' r='4' />
							</svg>
							<span className='text-md text-[#5e5e5e] dark:text-[#d5d5d5]'>{author}</span>
				</div>
				</div>
				
			</div>
		</div>
	);
}

export default Card;
