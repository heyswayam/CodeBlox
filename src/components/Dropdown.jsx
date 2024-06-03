import React, { useState, useId,forwardRef } from "react";

import { Link } from "react-router-dom";

function Dropdown(
	{
		label = "filter",
		options
	},
	ref,
) {
	const [isActive, setisActive] = useState("hidden");
	const handleClick = () => {
		setisActive((prev) => (prev === "hidden" ? "active" : "hidden"));
	};
	return (
		<>
			<div className='relative w-fit flex flex-col'>
				<div className='inline-flex w-fit items-center overflow-hidden rounded-md border bg-white'>
					<div className='border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700'>{label}</div>

					<button onClick={handleClick} className='h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700'>
						<span className='sr-only'>Menu</span>
						<svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' viewBox='0 0 20 20' fill='currentColor'>
							<path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
						</svg>
					</button>
				</div>

				<div className={`flex transition rounded-md border border-gray-100 bg-white shadow-lg ${isActive}`} role='menu'>
					<div className='p-2'>
						{
							// conditionally renderring, orelse if the options array is empty, it will give error
							options?.map((obj) => (
								<>
									<div key={useId()} className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700' role='menuitem'>
										{obj.text}
									</div>
								</>
							))
						}
					</div>
				</div>
			</div>
		</>
	);
}

export default forwardRef(Dropdown);
