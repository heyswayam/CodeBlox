import React, { useState, useEffect } from "react";
import authService from "../appwrite/authService";
import { login } from "../context/authSlice";
import { setLoader } from "../context/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
function Signin() {
	const loading = useSelector((state) => state.loading.loader);
	// const [error, setError] = useState("");

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

	const onSubmit = async (data) => {
		try {
			dispatch(setLoader(true));
			const signIn = await authService.signIn(data);
			const userData = await authService.getCurrUser();
			dispatch(login(userData));
			toast.success("Signed in successfully", {
				position: "bottom-right",
			});
			navigate("/all-posts");
			dispatch(setLoader(false));
		} catch (e) {
			toast.error("Sign-in error: " + e.message, {
				position: "bottom-right",
			});
			dispatch(setLoader(false));
		}
	};

	// useEffect(() => {
	// 	console.log("Error state updated:", error);
	// }, [error]);

	return (
		<div className='mx-auto max-w-screen-xl px-4 pt-16 sm:px-6 lg:px-8 dark:bg-accent-50'>
			<div className='mx-auto max-w-lg mt-6 text-center'>
				<h1 className='mt-5 text-xl leading-tight font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white'>
					Welcome to <span className='font-mono font-thin'>CodeBlox</span>
				</h1>

				<p className='mx-auto mt-4 max-w-md text-center text-gray-500 dark:text-gray-300'>Our promise to you: we'll keep your account safe, unless you use a password like 'password123'?</p>

				<form onSubmit={handleSubmit(onSubmit)} className='mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 dark:bg-gray-700/30'>
					<p className='text-center text-lg font-medium dark:text-white'>Sign in to your account</p>

					{/* {error && (
						<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
							<span className='block sm:inline'>{error}</span>
						</div>
					)} */}

<div className="relative">
    <input
        {...register("email", { required: "Email is required" })}
        type="email"
        id="floating_email"
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
    />
    <label
        htmlFor="floating_email"
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] rounded-md bg-[#f1eef6] dark:bg-[#181923] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
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
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] rounded-md bg-[#f1eef6] dark:bg-[#181923] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
    >
        Password
    </label>
    {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
    <span className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer" onClick={handlePasswordVisibility}>
        {/* SVG for password visibility toggle */}
    </span>
</div>

					<button type='submit' className='block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white' disabled={loading}>
						{loading ? "Signing in..." : "Sign in"}
					</button>

					<p className='text-center text-sm text-gray-500 dark:text-gray-300'>
						Don't have an account? {" "}
						<Link to='/signup' className='underline dark:text-indigo-400'>
							Sign up
						</Link>
					</p>
					<p className='text-center text-sm text-gray-500 dark:text-gray-300'>
						<Link to='/email-signin' className='underline dark:text-indigo-400'>
							{" "}
							Receive an email
						</Link>
						{" "} for password-free sign-in
					</p>
				</form>
			</div>
		</div>
	);
}

export default Signin;
