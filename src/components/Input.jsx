import React, { forwardRef, useId } from "react";

const Input = forwardRef(
    ({ label, type, className,...props },ref) => {
	return (
		<>
			{label && (
				<label className='inline-block mb-1 pl-1' htmlFor={id}>
					{label}
				</label>
			)}
			<input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={ref} {...props} id={id}></input>
		</>
	);
}
);

export default Input;
