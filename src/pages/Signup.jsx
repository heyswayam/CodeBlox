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
			const signup = await authService.signUp(data);
			if (signup) {
				const { email, password } = data;
				await authService.signIn({ email, password });
			}
			const userData = await authService.getCurrUser()
			dispatch(login(userData));
			toast.success('Account created successfully! Welcome '+data.name,{
				position:"bottom-right"
			})
			navigate("/all-posts")
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

<div className="relative">
    <input
        {...register("name", { required: "Name is required" })}
        type="text"
        id="floating_name"
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
    />
    <label
        htmlFor="floating_name"
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f1eef6] dark:bg-[#181923] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
    >
        Full Name
    </label>
    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
</div>

<div className="relative mt-4">
    <input
        {...register("email", { required: "Email is required" })}
        type="email"
        id="floating_email"
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
    />
    <label
        htmlFor="floating_email"
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f1eef6] dark:bg-[#181923] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
    >
        Email
    </label>
    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
</div>

<div className="relative mt-4">
    <input
        {...register("password", { required: "Password is required" })}
        type={passwordVisible ? "text" : "password"}
        id="floating_password"
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
    />
    <label
        htmlFor="floating_password"
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#f1eef6] dark:bg-[#181923] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
    >
        Password
    </label>
    {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
    <span className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer" onClick={handlePasswordVisibility}>
        {/* SVG for password visibility toggle */}
    </span>
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
