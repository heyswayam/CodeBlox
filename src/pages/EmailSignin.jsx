import React, { useState, useEffect } from "react";
import authService from "../appwrite/authService";
import { login } from "../context/authSlice";
import { setLoader } from "../context/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "sonner";

function EmailSignin() {
	const loading = useSelector((state) => state.loading.loader);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const location = useLocation();

	const onSubmit = async (data) => {
		try {
			dispatch(setLoader(true));
			await authService.passwordLessSignin(data.email);
			toast.success("Email sent successfully", {
				position: "bottom-right",
			});
			dispatch(setLoader(false));
		} catch (e) {
			toast.error("Sign-in error: " + e.message, {
				position: "bottom-right",
			});
			dispatch(setLoader(false));
		}
	};

	// useEffect(() => {
	// 	const verifyMagicLink = async () => {
	// 		try {
	// 			dispatch(setLoader(true));

	// 			const session = await authService.getPasswordlesstoken();
	// 			dispatch(login(session)); // Assuming you have a login action to update auth state
    //             toast.success("Sign in successfull", {
    //                 position: "bottom-right",
    //             });
	// 			dispatch(setLoader(false));
	// 			navigate("/");
	// 		} catch (error) {
	// 			toast.error("Verification failed: " + error.message, {
	// 				position: "bottom-right",
	// 			});
	// 			dispatch(setLoader(false));
	// 		}

	// 		verifyMagicLink();
	// 	};
	// }, [location, navigate]);

	return (
		<div className='mx-auto max-w-screen-xl px-4 pt-16 sm:px-6 lg:px-8 dark:bg-accent-50'>
			<div className='mx-auto max-w-lg mt-6 text-center'>
				<h1 className='mt-5 text-xl leading-tight font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white'>
					Welcome to <span className='font-mono font-thin'>CodeBlox</span>
				</h1>

				<form onSubmit={handleSubmit(onSubmit)} className='mb-0 space-y-4 rounded-lg p-4 my-10 shadow-lg sm:p-6 lg:p-8 dark:bg-gray-700/30'>
					<p className='text-center text-lg font-medium dark:text-white'>Sign in to your account</p>

					<div>
						<label htmlFor='email' className='sr-only'>
							Email
						</label>
						<div className='relative'>
							<input {...register("email", { required: "Email is required" })} type='email' className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white' placeholder='Enter email' />
							{errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
						</div>
					</div>
					<button type='submit' className='block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white' disabled={loading}>
						{loading ? "Sending..." : "Get Email"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default EmailSignin;