import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import postService from "../appwrite/postService";

function Card({ $id, title, fileid, content }) {
	// Helper function to truncate HTML content to the first 50 characters
	const truncateHTML = (html, charLimit) => {
		const text = html.replace(/<[^>]+>/g, ""); // Remove HTML tags
		return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
	};
    const [imageAddress, setImageAddress] = useState("");

    useEffect(() => {
        const fetchImageAddress = async () => {
            try {
                const address = await postService.getFilePreview(fileid);
                setImageAddress(address);
                console.log(address);
            } catch (error) {
                console.error("Error fetching image address:", error);
            }
        };

        fetchImageAddress();
    }, [fileid]);

	return (
		<div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
			<Link to={`/posts/${$id}`}>
				<img className='rounded-t-lg w-full h-60 object-cover' src={imageAddress} alt={title} />
			</Link>
			<div className='p-5'>
				<Link to={`/posts/${$id}`}>
					<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{title}</h5>
				</Link>
				<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{truncateHTML(content, 50)}</p>
				<Link to={`/posts/${$id}`} className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
					Read more
					<svg className='rtl:rotate-180 w-3.5 h-3.5 ms-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
						<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12M9 1l4 4-4 4' />
					</svg>
				</Link>
			</div>
		</div>
	);
}

export default Card;
