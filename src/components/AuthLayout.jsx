import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../context/loaderSlice";
import PulseLoader from "react-spinners/PulseLoader";

import { useNavigate } from "react-router-dom";

function AuthLayout({ children }) {
	//handing loading state
	const loading = useSelector((state) => state.loading.loader);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const authStatus = useSelector((state) => state.auth.status);
	// const location = useLocation();
	/*

so, if the user is not authenticated, with the help of navigate i send them to signup but if the user is registered but not authenticated, then even if i click signin, i am still getting transferred to /signup
so, using use
*/

	useEffect(() => {
		// dispatch(setLoader(true));
		// if (!authStatus && location.pathname !== "/signin") navigate("/signup");
		if (!authStatus && location.pathname === "/all-posts") navigate("/signin");
		if(authStatus && (location.pathname === "/signin" || location.pathname === "/signup") ) navigate("/all-posts");
		// else if (authStatus) navigate("/");
		// dispatch(setLoader(false));
	}, [authStatus, navigate]);


	return loading === false ? (
		<>{children}</>
	) : (
		<div className='flex flex-col h-screen justify-center items-center bg-[#111827]'>
			<PulseLoader color='#367bd6' size={15} />
			<div className='font-medium text-2xl text-[#367bd6] mt-5'>Checking if you are logged in or not.....🧑‍🍳</div>
		</div>
	);
}

export default AuthLayout;
