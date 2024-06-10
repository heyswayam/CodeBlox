import React, { useEffect, useState } from "react";
import ThemeBtn from "./ThemeBtn";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import { login,logout } from "../context/authSlice";

import { setLoader } from "../context/loaderSlice";


export default function Header() {
	const loading = useSelector((state) => state.loading.loader);

	const authStatus = useSelector((state) => state.auth.status);
	const [loggedinUser, setloggedinUser] = useState("");
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	const asyncFun = async () => {
	// 		const response = await authService.getCurrUser();
	// 		if (response) {
	// 			console.log(response);
	// 			dispatch(login(response));
	// 		}
	// 	};
	// 	asyncFun();
	// }, []);

	const navigate = useNavigate();
	const handleLogout = async () => {
		dispatch(setLoader(true));
		await authService.logout();
		dispatch(logout());
		dispatch(setLoader(false));
		navigate("/")
	};
	return (
		<header className='bg-white dark:bg-gray-900'>
			<div className='mx-auto w-full px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 items-center justify-between'>
					<div className='flex-1 md:flex md:items-center md:gap-12'>
						<Link to='/' className='block dark:text-white text-gray-500 font-mono text-xl'>
							CodeBlox
						</Link>
					</div>

					<div className='md:flex md:items-center flex md:justify-between justify-end w-7/12 md:gap-12'>
						<nav aria-label='Global' className='hidden md:block'>
							<ul className='flex items-center gap-6 text-sm'>
								<li>
									<Link to='/home' className='text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75' href='#'>
										Home
									</Link>
								</li>
								<li>
									<Link to='/yourBlogs' className='text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75' href='#'>
										Your Blogs
									</Link>
								</li>
							</ul>
						</nav>

						<div className='flex w-fit items-center justify-between gap-4'>
							<div className='hidden items-center md:flex'>
								{/* conditionaly renders button based on authStatus */}
								{!authStatus && (
									<button onClick={() => navigate("/signin")} className='rounded-md bg-teal-600 px-5 py-2.5 mx-3 text-sm font-medium text-white shadow dark:hover:bg-teal-500' href='#'>
										Login
									</button>
								)}

								{!authStatus && (
									<button onClick={() => navigate("/signup")} className='rounded-md bg-gray-100 px-5 py-2.5 mx-3 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75' href='#'>
										Register
									</button>
								)}

								{authStatus && (
									<button onClick={handleLogout} className='rounded-md bg-gray-100 px-5 py-2.5 mx-3 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75' href='#'>
										Logout{" " + loggedinUser}
									</button>
								)}
								<div>
									{/* handles dark mode light mode switching */}
									<ThemeBtn />
								</div>
							</div>

							<div className='block  md:hidden'>
								<button className='rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75'>
									<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
