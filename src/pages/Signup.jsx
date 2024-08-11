import React, { useEffect, useState } from "react";
import authService from "../appwrite/authService";
import { login } from "../context/authSlice";
import { setLoader } from "../context/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";


function Signup() {
	const loading = useSelector((state) => state.loading.loader);
	const [error, setError] = useState("");
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
	const onSubmit = (data) => {
		dispatch(setLoader(true));
		authService
			.signUp(data)
			.then(() => {
				const { email, password } = data;
				authService
					.signIn({ email, password })
					.then(() => authService.getCurrUser())
					.then((resData) => dispatch(login(resData)));
				// navigate("/all-posts"); this is automatically managed in authLayout
			})
			.catch((e) => {
				setError(e.message);
				// alert(e.message);
				// console.log(e.message);
			})
			.finally(dispatch(setLoader(false)));
	};

	// useEffect(() => {
	// 	console.log(error);
	// }, [error]);

	return (
		// <section className='bg-white dark:bg-gray-900'>
		// 	<div className='lg:grid lg:min-h-screen '>


		// 		<main className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
		// 			<div className='max-w-xl lg:max-w-3xl'>
		// 				<a className='block text-blue-600' href='#'>
		// 					<span className='sr-only'>Home</span>
		// 				</a>

		// 				<h1 className='mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white'>
		// 					Welcome to <span className='font-mono font-thin'>CodeBlox</span>
		// 				</h1>

		// 				<p className='mt-4 leading-relaxed text-gray-500 dark:text-gray-400'>Sign up and join the party! (Don't worry, we won't make you dance)</p>
		// 				{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
		// 				<form onSubmit={handleSubmit(onSubmit)} className='mt-8 grid grid-cols-6 gap-6 w-10/12 '>
		// 					<div className='col-span-6'>
		// 						<label htmlFor='FullName' className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
		// 							Full Name
		// 						</label>

		// 						<input {...register("name", { required: true })} type='text' id='FullName' className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200' />
		// 					</div>

		// 					<div className='col-span-6'>
		// 						<label htmlFor='Email' className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
		// 							Email
		// 						</label>

		// 						<input {...register("email", { required: true })} type='email' id='Email' className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200' />
		// 					</div>

		// 					<div className='col-span-6 '>
		// 						<label htmlFor='Password' className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
		// 							Password
		// 						</label>

		// 						<input
		// 							{...register("password", { required: true, minLength: 8 })}
		// 							type='password'
		// 							id='Password'
		// 							className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
		// 							placeholder='Enter password'
		// 						/>
		// 						{errors.password && errors.password.type === "minLength" && <p className='text-red-500 text-sm mt-2'>Password must be at least 8 characters long.</p>}
		// 					</div>

		// 					<div className='col-span-6'>
		// 						<p className='text-sm text-gray-500 dark:text-gray-400'>By signing up, you agree to our terms and conditions 🥱. And our privacy policy: we won't spam you, unless you're a bot</p>
		// 					</div>

		// 					<div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
		// 						<button
		// 							type='submit'
		// 							// onClick={()=>dispatch(setLoader(true))}
		// 							className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white'
		// 						>
		// 							Create an account
		// 						</button>

		// 						<p className='mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400'>
		// 							Already have an account?{" "}
		// 							<Link to='/signin' className='text-gray-700 underline dark:text-gray-200'>
		// 								Log in
		// 							</Link>
		// 							.
		// 						</p>
		// 					</div>
		// 				</form>
		// 			</div>
		// 		</main>
		// 	</div>
		// </section>
		<div className='mx-auto max-w-screen-xl px-4 pt-5 sm:px-6 lg:px-8  '>
		<div className='mx-auto max-w-lg my-10 text-center'>
			<h1 className='mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white leading-tight'>
				Welcome to <span className='font-mono font-thin'>CodeBlox</span>
			</h1>

			<p className='mx-auto mt-4 max-w-md text-center text-gray-500 dark:text-gray-300'>Sign up and join the party! (Don't worry, we won't make you dance)</p>

			<form onSubmit={handleSubmit(onSubmit)} className='mb-0 space-y-4 rounded-lg  shadow-lg p-6 mt-3 dark:bg-gray-700/30'>
				<p className='text-center text-lg font-medium dark:text-white'>Create an account</p>

				{error && (
					<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
						<span className='block sm:inline'>{error}</span>
					</div>
				)}

				<div>
					<label htmlFor='FullName' className='sr-only'>
					FullName
					</label>
					<div className='relative'>
					<input {...register("name", { required: "Name is required" })} type='text' id='FullName' className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white' placeholder='Enter your name' />
					{errors.name && <span className='text-red-500 text-xs'>{errors.name.message}</span>}
					</div>
				</div>
				<div>
						<label htmlFor='Email' className='sr-only'>
							Email
						</label>
						<div className='relative'>
						<input {...register("email", { required: "Email is required"})} type='email' id='Email' className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white' placeholder='Enter email' />
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
