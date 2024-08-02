import React, { useState, useId } from "react";
import { Link } from "react-router-dom";

function Dropdown({ label = "filter", options }) {
	const [isActive, setisActive] = useState("hidden");
	const handleClick = () => {
		setisActive((prev) => (prev === "hidden" ? "active" : "hidden"));
	};

	return (
		<>
			<div className='absolute end-3 w-fit flex flex-col mt-3'>
				<div className='inline-flex w-fit items-center overflow-hidden rounded-md shadow-sm dark:shadow-sm bg-white dark:bg-gray-900/50'>
					<div className='px-4 py-2 text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'>{label}</div>
					<button onClick={handleClick} className='h-full p-2 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'>
						<span className='sr-only'>Menu</span>
						<svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' viewBox='0 0 20 20' fill='currentColor'>
							<path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
						</svg>
					</button>
				</div>
				<div className={`flex transition rounded-md bg-white dark:bg-gray-900/50 shadow-lg ${isActive}`} role='menu'>
					<div className='p-2'>
						{options?.map((obj) => (
							<div key={obj.key} className='block rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300' role='menuitem'>
								{obj.text}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Dropdown;
