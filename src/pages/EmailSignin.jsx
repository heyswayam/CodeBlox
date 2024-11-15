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
					<p className='text-center text-lg font-medium dark:text-white'>Join the Codeblox Community</p>

					<div>
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
								className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] rounded-md bg-[#f1eef6] dark:bg-[#181923] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
							>
								Email
							</label>
							{errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
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