import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import authService from "./appwrite/authService";
import { login, logout } from "./context/authSlice";
import { setLoader } from "./context/loaderSlice";

import { Header, Footer, Card, Dropdown, RTE, PostForm } from "./components/index";
import PulseLoader from "react-spinners/PulseLoader";

function App() {
	const loading = useSelector((state) => state.loading.loader);
	const theme = useSelector((state) => state.theme.mode);
	const location = useLocation();

	const dispatch = useDispatch();
	//logged in or not
	useEffect(() => {
		authService
			.getCurrUser()
			.then((userData) => {
				if (userData) {
					dispatch(login(userData));
				} else {
					dispatch(logout());
				}
			})
			.catch((error) => {
				console.log("The error is being showed becoz the User is not logged in");
				// console.log('\n'.repeat('25'));
			})
			.finally(() => {
				dispatch(setLoader(false));
			});
	}, []);

	return (
		<div className='flex flex-col min-h-screen'>
			<Toaster theme={theme} richColors closeButton={true}/>
			<Header />
			<main className='flex-grow'>
				{loading && (
					<div className='flex flex-col h-screen justify-center items-center  bg-background overflow-hidden'>
						<PulseLoader color='#7850de' size={15} />
					</div>
				)}
				{!loading && <Outlet />}
			</main>
			{location.pathname !== "/" && <Footer />}
		</div>
	);
}

export default App;
