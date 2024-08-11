import React, { useState, useEffect } from "react";
import authService from "../appwrite/authService";
import { login } from "../context/authSlice";
import { setLoader } from "../context/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

function Signin() {
	const loading = useSelector((state) => state.loading.loader);
	const [error, setError] = useState("");

	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const [passwordVisible, setPasswordVisible] = useState(false);

	const handlePasswordVisibility = () => {
		setPasswordVisible((prev) => !prev);
	};

	const onSubmit = (data) => {
		authService
			.signIn(data)
			.then((userData) => dispatch(login(userData)))
			.catch((e) => {
				// console.log("Sign-in error:", e);
				// alert(e.message);
				setError(e.message);
			})
			.finally(dispatch(setLoader(false)));
	};

	// useEffect(() => {
	// 	console.log("Error state updated:", error);
	// }, [error]);

	return (
		<div className='mx-auto max-w-screen-xl px-4 pt-16 sm:px-6 lg:px-8 dark:bg-accent-50'>
			<div className='mx-auto max-w-lg my-10 text-center'>
				<h1 className='mt-6 text-xl leading-tight font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white'>
					Welcome to <span className='font-mono font-thin'>CodeBlox</span>
				</h1>

				<p className='mx-auto mt-4 max-w-md text-center text-gray-500 dark:text-gray-300'>Our promise to you: we'll keep your account safe, unless you use a password like 'password123'?</p>

				<form onSubmit={handleSubmit(onSubmit)} className='mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 dark:bg-gray-700/30'>
					<p className='text-center text-lg font-medium dark:text-white'>Sign in to your account</p>

					{error && (
						<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
							<span className='block sm:inline'>{error}</span>
						</div>
					)}

					<div>
						<label htmlFor='email' className='sr-only'>
							Email
						</label>
						<div className='relative'>
							<input {...register("email", { required: "Email is required" })} type='email' className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white' placeholder='Enter email' />
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
						{loading ? "Signing in..." : "Sign in"}
					</button>

					<p className='text-center text-sm text-gray-500 dark:text-gray-300'>
						Don't have an account?
						<Link to='/signup' className='underline dark:text-indigo-400'>
							{" "}
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Signin;
