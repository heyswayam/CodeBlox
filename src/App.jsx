import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, Link,   } from "react-router-dom";

import authService from "./appwrite/authService";
import { login, logout } from "./context/authSlice";
import { setLoader } from "./context/loaderSlice";

import { toast } from "sonner";
import { Header, Footer, Card, Dropdown, RTE, PostForm, MetaDecorator } from "./components/index";
import PulseLoader from "react-spinners/PulseLoader";

function App() {
	const loading = useSelector((state) => state.loading.loader);
	const theme = useSelector((state) => state.theme.mode);

	const navigate = useNavigate();
	const location = useLocation();

	const dispatch = useDispatch();
	//logged in or not
	useEffect(() => {
		authService
			.getCurrUser()
			.then((userData) => {
				if (userData) {
					dispatch(login(userData));
					toast.success("Sign-in successful. Welcome "+userData.name, {
						position: "bottom-right",
					});
				} else {
					dispatch(logout());
				}
			})
			// .catch((error) => {
			// 	console.log("The error is being showed becoz the User is not logged in");
			// 	// console.log('\n'.repeat('25'));
			// })
			.finally(() => {
				dispatch(setLoader(false));
			});
	}, [dispatch]);
	
	
	// this useEffect doesn't runs, you get signed in automatically. HOW???

	// useEffect(() => {
	// 	const verifyMagicLink = async () => {
	// 		try {
	// 			dispatch(setLoader(true));

	// 			const session = await authService.getPasswordlesstoken();
	// 			dispatch(login(session)); // Assuming you have a login action to update auth state
	// 			dispatch(setLoader(false));
    //             toast.success("Sign in successfull", {
    //                 position: "bottom-right",
    //             });
	// 			// window.location.reload();	//not working need to manually refresh
	// 			// navigate("/all-posts");
	// 		} catch (error) {
	// 			toast.error("Verification failed: " + error.message, {
	// 				position: "bottom-right",
	// 			});
	// 			dispatch(setLoader(false));
	// 		}

	// 		verifyMagicLink();
	// 	};
	// }, [dispatch, navigate]);
	
	return (
		<div className='flex flex-col min-h-screen'>
			<MetaDecorator title="Codeblox" description="A simple blog application"  siteUrl={window.location.href} />
			<Toaster theme={theme} expand={true} richColors closeButton={true}/>
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