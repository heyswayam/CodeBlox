import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import authService from "./appwrite/authService";
import { login, logout } from "./context/authSlice";
import { setLoader } from "./context/loaderSlice";

import { Header, Footer, Card, Dropdown,RTE, PostForm  } from "./components/index";
import PulseLoader from "react-spinners/PulseLoader";

function App() {
	const loading = useSelector((state)=>state.loading.loader)
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
				dispatch(setLoader(false))
			});
	}, []);

	return loading === false ? (
		<>
			<Header />
			<Outlet/>
			<Footer />
		</>
	) : (
		<div className='flex flex-col h-screen justify-center items-center bg-[#111827]'>
			<PulseLoader color='#367bd6' size={15} />
			<div className='font-medium text-2xl text-[#367bd6] mt-5'>Good things takes time.....🧑‍🍳</div>
		</div>
	);
}

export default App;
