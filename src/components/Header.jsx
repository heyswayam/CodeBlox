import React, { useEffect, useState } from "react";
import ThemeBtn from "./ThemeBtn";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authService from "../appwrite/authService";
import { login, logout } from "../context/authSlice";
import { setLoader } from "../context/loaderSlice";
import { toast } from "sonner";

export default function Header() {
	const loading = useSelector((state) => state.loading.loader);
	// console.log("loading: " + loading);
	const authStatus = useSelector((state) => state.auth.status);
	// console.log("auth: " + authStatus);
	const location = useLocation();
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
		try {
			dispatch(setLoader(true));
			await authService.logout();
			dispatch(logout());

			toast.success("Logged out successfully!", {
				position: "bottom-right",
			});
			dispatch(setLoader(false));
			navigate("/");
		} catch (e) {
			toast.error("Logout error: " + e.message ,{
				position:"bottom-right"
			})
			dispatch(setLoader(false));
		}
	};

	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className='bg-white/30 dark:bg-gray-900/30 backdrop-blur-md sticky top-0 z-10'>
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
								{/* the hovering underline effect's css is inside index.css do not mess with it */}
								<li>
									<Link to='/' className={`transition  link-with-underline $nav-link ${location.pathname === "/" ? "active" : ""}`}>
										Home
									</Link>
								</li>
								<li>
									<Link to='/all-posts' className={` transition link-with-underline $nav-link ${location.pathname === "/all-posts" ? "active" : ""}`}>
										All Posts
									</Link>
								</li>
							</ul>
						</nav>

						<div className='flex w-fit items-center justify-between'>
							<div className='hidden items-center lg:flex md:gap-4'>
								{/* conditionaly renders button based on authStatus */}
								{!authStatus && (
									<button onClick={() => navigate("/signin")} className='rounded-md bg-primary hover:shadow-md hover:shadow-primary  px-5 py-2.5 mx-3 text-sm font-medium text-white hover:text-purple-50	 shadow  transition-all' href='#'>
										Login
									</button>
								)}

								{!authStatus && (
									<button onClick={() => navigate("/signup")} className='rounded-md bg-secondary hover:shadow-md hover:shadow-secondary transition-all px-5 py-2.5 mx-3 text-sm font-medium text-white  ' href='#'>
										Register
									</button>
								)}

								{authStatus && (
									<Link to='/add-post' className='rounded-md px-5 py-2.5 mx-3 text-sm font-medium bg-secondary dark:bg-primary text-white dark:hover:text-white/75'>
										Add Post
									</Link>
								)}
								{authStatus && (
									<button onClick={handleLogout} className='rounded-md px-5 py-2.5 mx-3 text-sm font-medium bg-primary dark:bg-secondary  text-white' href='#'>
										Logout
									</button>
								)}
								{/* <div className="hidden  md:block"> */}
								<div>
									{/* handles dark mode light mode switching */}
									<ThemeBtn />
								</div>
							</div>

							<button onClick={() => setIsOpen(!isOpen)} className='flex rounded lg:hidden text-gray-600 transition dark:text-white '>
								<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
									<path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
								</svg>
							</button>
							<div className='block  lg:hidden'>
								{isOpen && (
									<div className={`absolute top-16 right-0 bg-white/30 dark:bg-gray-900/30 p-4 w-full transition duration-300 ease-in-out backdrop-blur-md {${isOpen}? '-translate-y-60' :' -translate-y-3'`}>
										<ul>
											<li>
												<Link
													to='/'
													onClick={() => setIsOpen(!isOpen)}
													className='block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50/80 hover:text-gray-700 transition hover:text-gray-500/75 dark:hover:bg-gray-50/10 dark:text-white dark:hover:text-white/75'
													href='#'
												>
													Home
												</Link>
											</li>
											<li>
												<Link
													to='/all-posts'
													onClick={() => setIsOpen(!isOpen)}
													className='block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50/80 hover:text-gray-700 transition hover:text-gray-500/75 dark:hover:bg-gray-50/10 dark:text-white dark:hover:text-white/75'
													href='#'
												>
													All Posts
												</Link>
											</li>
										</ul>
										<div className='flex h-fit justify-between  w-8/12 sm:w-6/12 ml-3 m-4'>
											{!authStatus && (
												<button
													onClick={() => {
														setIsOpen(!isOpen);
														navigate("/signin");
													}}
													className='block rounded-md px-4 py-2 text-xs text-white bg-primary hover:shadow-md hover:shadow-primary transition'
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
													className=' block rounded-md px-4 py-2 text-xs bg-secondary hover:shadow-md hover:shadow-secondary text-white'
													href='#'
												>
													Register
												</button>
											)}
											{authStatus && (
												<Link to='/add-post' onClick={() => setIsOpen(!isOpen)} className='block rounded-lg px-4 py-2 text-xs text-white bg-secondary dark:bg-primary transition '>
													Add Post
												</Link>
											)}
											{authStatus && (
												<button
													onClick={() => {
														handleLogout();
														setIsOpen(!isOpen);
													}}
													className='block rounded-lg px-4 py-2 text-xs text-white bg-primary dark:bg-secondary '
												>
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
