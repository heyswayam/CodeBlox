import React, { useState } from "react";
import authService from "../appwrite/authService";
import { login } from "../context/authSlice";
import { setLoader } from "../context/loaderSlice";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

function Signin() {
	const loading = useSelector((state) => state.loading.loader);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const userData = useSelector((state) => state.auth.userData);
	const [passwordVisible, setPasswordVisible] = useState(false);
const navigate = useNavigate();
	const handlePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};
	const onSubmit = async (data) => {
		try {
			dispatch(setLoader(true));
			const response = await authService.signIn(data);
			// console.log("response: " + response.$id);
			if (response) {
				const userkaData = await authService.getCurrUser();
				dispatch(login(userkaData));

				console.log("userData:  " + userkaData.$id);
				dispatch(setLoader(false));
				navigate("/all-posts");
			}
		} catch (error) {
			console.log(`pages/Login/ error:: ${error}`);
		}
	};
	return (
		<>
			<div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 dark:bg-gray-800'>
				<div className='mx-auto max-w-lg my-10 text-center'>
					<h1 className='mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white'>
						Welcome to <span className='font-mono font-thin'>CodeBlox</span>
					</h1>

					<p className='mx-auto mt-4 max-w-md text-center text-gray-500 dark:text-gray-300'>Our promise to you: we'll keep your account safe, unless you use a password like 'password123'?</p>

					<form onSubmit={handleSubmit(onSubmit)} className='mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 dark:bg-gray-700'>
						<p className='text-center text-lg font-medium dark:text-white'>Sign in to your account</p>

						<div>
							<label htmlFor='email' className='sr-only'>
								Email
							</label>

							<div className='relative'>
								<input {...register("email", { required: true})} type='email' className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white' placeholder='Enter email' />

								<span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
									<svg xmlns='http://www.w3.org/2000/svg' className='size-4 text-gray-400 dark:text-gray-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
									</svg>
								</span>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>

							<div className='relative'>
								<input {...register("password", { required: true, minLength: 8 })} type='password' className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white' placeholder='Enter password' />
								{errors.password && errors.password.type === "minLength" && <p className='text-red-500 text-sm mt-2'>Password must be at least 8 characters long.</p>}

								<span className='absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer' onClick={handlePasswordVisibility}>
									<svg xmlns='http://www.w3.org/2000/svg' className='size-4 text-gray-400 dark:text-gray-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
									</svg>
								</span>
							</div>
						</div>

						<button type='submit' className='block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white dark:bg-indigo-500'>
							Sign in
						</button>

						<p className='text-center text-sm text-gray-500 dark:text-gray-300'>
							No account?
							<Link to='/signup' className='underline dark:text-indigo-400'>
								Sign up
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
}

export default Signin;
