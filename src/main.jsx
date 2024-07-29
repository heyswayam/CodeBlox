import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error } from "./components/index.js";
import { Provider } from "react-redux";
import { store } from "./context/store.js";
import { Signin, Signup, Home,AddPost,AllPosts } from "../src/pages/index.js";
import { AuthLayout } from "../src/components/index.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/Signin",
				element: (
					<AuthLayout>
						<Signin />
					</AuthLayout>
				),
			},

			{
				path: "/signup",
				element: (
					<AuthLayout>
						<Signup />
					</AuthLayout>
				),
			},
			{
				path: "/addpost",
				element: (
					<AuthLayout>
						<AddPost />
					</AuthLayout>
				),
			},
			{
				path: "/posts",
				element: (
					<AuthLayout>
						<AllPosts/>
					</AuthLayout>
				),
			},
			{
				path: "/",
				element: (
					// <AuthLayout>
						<Home />
					// </AuthLayout> 
				)
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
	// </React.StrictMode>,
);
