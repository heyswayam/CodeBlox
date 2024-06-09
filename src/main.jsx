import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error } from "./components/index.js";
import { Provider } from "react-redux";
import { store } from "./context/store.js";
import {Signin, Signup,Home } from "../src/pages/index.js";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/Signin",
				element: <Signin />,
			},

			{
				path: "/signup",
				element: <Signup/>,
			},
			{
				path: "/home",
				element: <Home/>,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
