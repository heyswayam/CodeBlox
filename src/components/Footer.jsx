import React from "react";

export default function Footer() {
	return (
		<footer className='w-full mx-auto p-3 flex items-center justify-between rounded-md'>

				<span className='text-sm mx-auto text-gray-500 text-center dark:text-gray-400'>
					<a href='https://github.com/heyswayam' className='hover:underline'>
						<span>Made with</span>
						<span className='font-handwriting text-lg text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500'> Love </span> <span>by Swayam</span>
					</a>
				</span>

		</footer>
	);
}
