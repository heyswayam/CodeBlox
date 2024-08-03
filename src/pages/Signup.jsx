import React, { useEffect, useState } from "react";
import authService from "../appwrite/authService";
import { login } from "../context/authSlice";
import { setLoader } from "../context/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

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

	useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<section className='bg-white dark:bg-gray-900'>
			<div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
				<aside className='relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6'>
					<img alt='' src='https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' className='absolute inset-0 h-full w-full object-cover' />
				</aside>

				<main className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
					<div className='max-w-xl lg:max-w-3xl'>
						<a className='block text-blue-600' href='#'>
							<span className='sr-only'>Home</span>
						</a>

						<h1 className='mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white'>
							Welcome to <span className='font-mono font-thin'>CodeBlox</span>
						</h1>

						<p className='mt-4 leading-relaxed text-gray-500 dark:text-gray-400'>Sign up and join the party! (Don't worry, we won't make you dance)</p>
						{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
						<form onSubmit={handleSubmit(onSubmit)} className='mt-8 grid grid-cols-6 gap-6 w-10/12 '>
							<div className='col-span-6'>
								<label htmlFor='FullName' className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
									Full Name
								</label>

								<input {...register("name", { required: true })} type='text' id='FullName' className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200' />
							</div>

							<div className='col-span-6'>
								<label htmlFor='Email' className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
									Email
								</label>

								<input {...register("email", { required: true })} type='email' id='Email' className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200' />
							</div>

							<div className='col-span-6 '>
								<label htmlFor='Password' className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
									Password
								</label>

								<input
									{...register("password", { required: true, minLength: 8 })}
									type='password'
									id='Password'
									className='mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
									placeholder='Enter password'
								/>
								{errors.password && errors.password.type === "minLength" && <p className='text-red-500 text-sm mt-2'>Password must be at least 8 characters long.</p>}
							</div>

							<div className='col-span-6'>
								<p className='text-sm text-gray-500 dark:text-gray-400'>By signing up, you agree to our terms and conditions 🥱. And our privacy policy: we won't spam you, unless you're a bot</p>
							</div>

							<div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
								<button
									type='submit'
									// onClick={()=>dispatch(setLoader(true))}
									className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white'
								>
									Create an account
								</button>

								<p className='mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400'>
									Already have an account?{" "}
									<Link to='/signin' className='text-gray-700 underline dark:text-gray-200'>
										Log in
									</Link>
									.
								</p>
							</div>
						</form>
					</div>
				</main>
			</div>
		</section>
	);
}

export default Signup;
