import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import postService from "../appwrite/postService";

function Card({ $id, title, fileid, content }) {
	// Helper function to truncate HTML content to the first 50 characters
	const truncateHTML = (html, charLimit) => {
		const text = html.replace(/<[^>]+>|&nbsp;|&[a-zA-Z]+;/g, ""); // Remove HTML tags and HTML entities like &nbsp; &amp;, &lt;, &gt;
		return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
	};
	const [imageAddress, setImageAddress] = useState("");

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
				{/* <Link
					to={`/post/${$id}`}
					className='w-fit inline-flex items-center text-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-violet-600  dark:hover:shadow-lg dark:hover:shadow-purple-900 px-3.5 py-1.5 mb-5 text-base font-semibold bg-violet-200/50 text-violet-200 hover:bg-purple-300/40 hover:shadow-violet-200/60 hover:shadow-md transition-all'
				>
					Read more
					<svg className='rtl:rotate-180 w-3.5 h-3.5 ms-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
						<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12M9 1l4 4-4 4' />
					</svg>
				</Link> */}
				<Link to={`/post/${$id}`} className='group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-gray-200'>
					Read more
					<span aria-hidden='true' className='block transition-all group-hover:ms-0.5 rtl:rotate-180'>
						&rarr;
					</span>
				</Link>
			</div>
		</div>
	);
}

export default Card;
