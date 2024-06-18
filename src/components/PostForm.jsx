import React, { useReducer, useRef } from "react";
import {RTE} from "./index"
export default function PostForm() {
	const ref = useRef(0);
	return (
		<>
			{/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

<section className='bg-gray-50 dark:bg-gray-900'>
    <div className='mx-auto max-w-screen-xl px-4 py-5 sm:px-6 lg:px-3'>
        <div className='grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-5'>
            <div className='rounded-lg bg-white dark:bg-gray-800 shadow-lg lg:col-start-1 lg:col-end-6 lg:px-20 lg:py-10'>
                <form action='#' className='space-y-4'>
                    <div>
                        <label className='sr-only' htmlFor='title'>
                            Title
                        </label>
                        <input className='w-full rounded-lg border-gray-300 dark:border-gray-700 p-3 text-sm dark:bg-gray-700 dark:text-gray-50' placeholder='Title' type='text' id='title' />
                    </div>

                    {/* <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <div>
                            <label className='sr-only' htmlFor='email'>
                                Email
                            </label>
                            <input className='w-full rounded-lg border-gray-300 dark:border-gray-700 p-3 text-sm dark:bg-gray-700 dark:text-gray-50' placeholder='Email address' type='email' id='email' />
                        </div>

                        <div>
                            <label className='sr-only' htmlFor='phone'>
                                Phone
                            </label>
                            <input className='w-full rounded-lg border-gray-300 dark:border-gray-700 p-3 text-sm dark:bg-gray-700 dark:text-gray-50' placeholder='Phone Number' type='tel' id='phone' />
                        </div>
                    </div> */}

                    <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
                        <div>
                            <label htmlFor='Option1' className='block w-full cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-50 hover:border-black dark:hover:border-white has-[:checked]:border-black dark:has-[:checked]:border-white has-[:checked]:bg-black dark:has-[:checked]:bg-gray-300 has-[:checked]:text-white dark:has-[:checked]:text-black' tabIndex='0'>
                                <input className='sr-only' id='Option1' type='radio' tabIndex='-1' name='option' />

                                <span className='text-sm'> Option 1 </span>
                            </label>
                        </div>

                        <div>
                            <label htmlFor='Option2' className='block w-full cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-50 hover:border-black dark:hover:border-white has-[:checked]:border-black dark:has-[:checked]:border-white has-[:checked]:bg-black dark:has-[:checked]:bg-gray-300 has-[:checked]:text-white dark:has-[:checked]:text-black' tabIndex='0'>
                                <input className='sr-only' id='Option2' type='radio' tabIndex='-1' name='option' />

                                <span className='text-sm'> Option 2 </span>
                            </label>
                        </div>

                        <div>
                            <label htmlFor='Option3' className='block w-full cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-50 hover:border-black dark:hover:border-white has-[:checked]:border-black dark:has-[:checked]:border-white has-[:checked]:bg-black dark:has-[:checked]:bg-gray-300 has-[:checked]:text-white dark:has-[:checked]:text-black' tabIndex='0'>
                                <input className='sr-only' id='Option3' type='radio' tabIndex='-1' name='option' />

                                <span className='text-sm'> Option 3 </span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <RTE/>
                    </div>

                    <div className='mt-4'>
                        <button type='submit' className='inline-block w-full rounded-lg bg-black dark:bg-white px-5 py-3 font-medium text-white dark:text-black sm:w-auto'>
                            Send Enquiry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
		</>
	);
}
