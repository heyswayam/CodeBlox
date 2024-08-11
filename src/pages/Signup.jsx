import React, { useEffect, useState } from "react";
import authService from "../appwrite/authService";
import { login } from "../context/authSlice";
import { setLoader } from "../context/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {toast} from "sonner";
function Signup() {
	const loading = useSelector((state) => state.loading.loader);
	// const [error, setError] = useState("");
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [passwordVisible, setPasswordVisible] = useState(false);

	const handlePasswordVisibility = () => {
		setPasswordVisible((prev) => !prev);
	};
	const onSubmit = async (data) => {
		try {
			dispatch(setLoader(true))
			const userData = await authService.signUp(data);
			dispatch(login(userData));
			toast.success('Account created successfully! Welcome '+data.name,{
				position:"bottom-right"
			})
			dispatch(setLoader(false))
		} catch (e) {
			toast.error('Sign up failed: ' + e.message);
		}
		dispatch(setLoader(false))
		// authService
		// 	.signUp(data)
		// 	.then((userData) => {
		// 		dispatch(login(userData));
		// 		toast.success('Sign up successful!');
		// 	})
		// 	.catch((e) => {
		// 		setError(e.message);
		// 		toast.error('Sign up failed: ' + e.message);
		// 	})
		// 	.finally(() => dispatch(setLoader(false)));
	};

	// useEffect(() => {
	// 	console.log(error);
	// }, [error]);

	return (
		
		<div className='mx-auto max-w-screen-xl px-4 pt-5 sm:px-6 lg:px-8  '>
			<div className='mx-auto max-w-lg my-10 text-center'>
				<h1 className='mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white leading-tight'>
					Welcome to <span className='font-mono font-thin'>CodeBlox</span>
				</h1>

				<p className='mx-auto mt-4 max-w-md text-center text-gray-500 dark:text-gray-300'>Sign up and join the party! (Don't worry, we won't make you dance)</p>

				<form onSubmit={handleSubmit(onSubmit)} className='mb-0 space-y-4 rounded-lg  shadow-lg p-6 mt-3 dark:bg-gray-700/30'>
					<p className='text-center text-lg font-medium dark:text-white'>Create an account</p>

					{/* {error && (
						<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
							<span className='block sm:inline'>{error}</span>
						</div>
					)} */}

					<div>
						<label htmlFor='FullName' className='sr-only'>
							FullName
						</label>
						<div className='relative'>
							<input
								{...register("name", { required: "Name is required" })}
								type='text'
								id='FullName'
								className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
								placeholder='Enter your name (will be displayed below post)'
							/>
							{errors.name && <span className='text-red-500 text-xs'>{errors.name.message}</span>}
						</div>
					</div>
					<div>
						<label htmlFor='Email' className='sr-only'>
							Email
						</label>
						<div className='relative'>
							<input {...register("email", { required: "Email is required" })} type='email' id='Email' className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white' placeholder='Enter email' />
							{errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
						</div>
					</div>
					<div>
						<label htmlFor='password' className='sr-only'>
							Password
						</label>
						<div className='relative'>
							<input
								{...register("password", { required: "Password is required" })}
								type={passwordVisible ? "text" : "password"}
								className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
								placeholder='Enter password'
							/>
							{errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
							<span className='absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer' onClick={handlePasswordVisibility}>
								{/* SVG for password visibility toggle */}
							</span>
						</div>
					</div>

					<button type='submit' className='block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white' disabled={loading}>
						{loading ? "Signing in..." : "Sign up"}
					</button>

					<p className='text-center text-sm text-gray-500 dark:text-gray-300'>
						Already have an account?
						<Link to='/signin' className='underline dark:text-indigo-400'>
							{" "}
							Sign in
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Signup;
