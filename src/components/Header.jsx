import React, { useEffect, useState } from "react";
import ThemeBtn from "./ThemeBtn";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import { login, logout } from "../context/authSlice";
import { setLoader } from "../context/loaderSlice";

export default function Header() {
	const loading = useSelector((state) => state.loading.loader);
	console.log("loading: " + loading);
	const authStatus = useSelector((state) => state.auth.status);
	console.log("auth: " + authStatus);
	// const userData = useSelector((state)=>state.auth.userData)
	// const loggedinUser = userData.name || "";
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
		navigate("/");
	};

	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className='bg-white dark:bg-gray-900  sticky top-0 z-10'>
			<div className='mx-auto w-full px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 items-center justify-between'>
					<div className='flex-1  md:flex md:items-center md:gap-12'>
						<Link to='/' className='block  w-fit  dark:text-white text-gray-500 font-mono text-xl'>
							CodeBlox
						</Link>
					</div>

					<div className='md:flex md:items-center flex md:justify-between justify-end w-7/12 md:gap-12'>
						<nav aria-label='Global' className='hidden md:block'>
							<ul className='flex items-center gap-6 text-sm'>
								<li>
									<Link to='/' className='text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75' href='#'>
										Home
									</Link>
								</li>
								<li>
									<Link to='/all-post' className='text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75' href='#'>
										All Posts
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
									<Link to='/add-post' className='rounded-md bg-gray-100 px-5 py-2.5 mx-3 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75'>
										Add Post
									</Link>
								)}
								{authStatus && (
									<button onClick={handleLogout} className='rounded-md bg-gray-100 px-5 py-2.5 mx-3 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75' href='#'>
										Logout
									</button>
								)}
								{/* <div className="hidden  md:block"> */}
								<div>
									{/* handles dark mode light mode switching */}
									<ThemeBtn />
								</div>
							</div>

							<div className='block  md:hidden'>
								<button onClick={() => setIsOpen(!isOpen)} className='rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75'>
									<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
									</svg>
								</button>
								{isOpen && (
									<div className='absolute top-16 right-0 bg-white dark:bg-gray-900 p-4 w-full transition duration-300 ease-in-out   -translate-y-4'>
										<ul>
											<li>
												<Link
													to='/'
													onClick={() => setIsOpen(!isOpen)}
													className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition hover:text-gray-500/75 dark:hover:bg-gray-800 dark:text-white dark:hover:text-white/75'
													href='#'
												>
													Home
												</Link>
											</li>
											<li>
												<Link
													to='/all-post'
													onClick={() => setIsOpen(!isOpen)}
													className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition hover:text-gray-500/75 dark:hover:bg-gray-800 dark:text-white dark:hover:text-white/75'
													href='#'
												>
													All Posts
												</Link>
											</li>
										</ul>
										<div className='flex h-fit justify-between  w-6/12 ml-3 m-4'>
											{!authStatus && (
												<button
													onClick={() => {
														setIsOpen(!isOpen);
														navigate("/signin");
													}}
													className='bg-teal-600 block rounded-md px-4 py-2 text-xs text-white hover:bg-teal-700 hover:text-white transition dark:text-white dark:hover:bg-teal-700 dark:hover:text-white/90'
												>
													Login
												</button>
											)}
											{!authStatus && (
												<button
													onClick={() => {
														setIsOpen(!isOpen);
														navigate("/signup");
													}}
													className='bg-teal-600 block rounded-md px-4 py-2 text-xs text-white hover:bg-teal-700 hover:text-white transition dark:text-white dark:hover:bg-teal-700 dark:hover:text-white/90'
													href='#'
												>
													Register
												</button>
											)}
											{authStatus && (
												<Link to='/add-post'  onClick={() => setIsOpen(!isOpen)} className='block rounded-lg px-4 py-2 text-xs text-white hover:bg-blue-600 transition bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white'>
													Add Post
												</Link>
											)}
											{authStatus && (
												<button onClick={() => {
													handleLogout();
													setIsOpen(!isOpen)}} className='block rounded-lg px-4 py-2 text-xs text-white bg-red-500  hover:bg-red-600 transition dark:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white'>
													Logout
												</button>
											)}
											<div className='content-center'>
												{/* handles dark mode light mode switching */}
												<ThemeBtn />
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
