import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error } from "./components/index.js";
import { Provider } from "react-redux";
import { store } from "./context/store.js";
import { Signin, Signup, Home,AddPost,AllPosts,Post,EditPost,EmailSignin,Redirecting } from "../src/pages/index.js";
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
				path: "/add-post",
				element: (
					<AuthLayout>
						<AddPost />
					</AuthLayout>
				),
			},
			{
				path: "/all-posts",
				element: (
					// <AuthLayout>
						<AllPosts/>
					// </AuthLayout>
				),
			},

			{
				path: "/redirecting",
				element: (

						<Redirecting/>

				),
			},
			{
				path: "/email-signin",
				element: (

						<EmailSignin/>

				),
			},

			{
				path: "/edit-post/:slug",
				element: (
					<AuthLayout>
						<EditPost/>
					</AuthLayout>
				),
			},
			{
				path: "/post/:slug",
				element: (
					// <AuthLayout>
						<Post/>
					// </AuthLayout>
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
		<SpeedInsights/>
		<Analytics />
	</Provider>,
	// </React.StrictMode>,
);
