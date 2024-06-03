import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";

import { Header, Footer,Card, Dropdown } from "./components/index";
import {Login} from "./pages/index"
import PulseLoader from "react-spinners/PulseLoader";


function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	//logged in or not
	useEffect(() => {
		authService
			.getCurrUser()
			.then((userData) => {
				if (userData) {
					dispatch(login(userData));
				}
				// else {
				//     dispatch(logout());
				// }
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return loading === false ? (
		<>
			<Header />
			<Login/>
			<Outlet />
			<Footer />
		</>
	) : (

		<div className="flex flex-col h-screen justify-center items-center bg-[#111827]">
			<PulseLoader color="#367bd6" size={15} />
			<div className="font-medium text-2xl text-[#367bd6] mt-5">Your data is being cooked.....🧑‍🍳</div>
		</div>

	);
}

export default App;
