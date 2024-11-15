import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";

import authService from "./appwrite/authService";
import { login, logout, updateName } from "./context/authSlice";
import { setLoader } from "./context/loaderSlice";

import { toast } from "sonner";
import { Header, Footer, Card, Dropdown, RTE, PostForm, MetaDecorator,NameModal } from "./components/index";
import PulseLoader from "react-spinners/PulseLoader";

function App() {
	const loading = useSelector((state) => state.loading.loader);
	const theme = useSelector((state) => state.theme.mode);

	const navigate = useNavigate();	
	const location = useLocation();

	const dispatch = useDispatch();
	const [isNameModalOpen, setIsNameModalOpen] = useState(false);

	const authStatus = useSelector((state) => state.auth.status);
//logged in or not
	useEffect(() => {
		authService
			.getCurrUser()
			.then((userData) => {
				if (userData) {
					dispatch(login(userData));
					if (userData.name === "") {
						setIsNameModalOpen(true);
					} else {
						toast.success("Sign-in successful. Welcome " + userData.name, {
							position: "bottom-right",
						});
					}
				} else {
					dispatch(logout());
				}
			})
			.catch((error) => {
				if (authStatus) {
					console.log("Error fetching user data:", error);
				}
				localStorage.removeItem("selectedOption");
			})
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
	const handleNameSave = (newName) => {
		authService.updateName(newName).then(() => {
			dispatch(updateName(newName));
			setIsNameModalOpen(false);
			toast.success("Sign-in successful. Welcome " + newName, {
				position: "bottom-right",
			});
		});
	};

	return (
		<div className='flex flex-col min-h-screen'>
			<MetaDecorator title='Codeblox' description='A simple blog application' siteUrl={window.location.href} />
			<Toaster theme={theme} expand={true} richColors closeButton={true} />
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

			<NameModal
				isOpen={isNameModalOpen}
				onSave={handleNameSave}
			/>
		</div>
	);
}

export default App;