import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../context/themeSlice";
export default function ThemeBtn() {
	// const [theme, setTheme] = useState("dark");
	const theme = useSelector((state) => state.theme.mode);
	const dispatch = useDispatch();

	const toggleTheme = () => {
		// setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
		dispatch(setTheme(theme === "dark" ? "light" : "dark"));
	};

	useEffect(() => {
		document.querySelector("html").setAttribute("data-theme", theme);
		document.querySelector("html").classList.remove("light", "dark");
		document.querySelector("html").classList.add(theme);
	}, [theme]);

	return (
		<button
			onClick={toggleTheme}
			className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none  active:outline-none focus:ring-opacity-50 ${theme === "dark" ? "bg-[#6a45ac] focus:" : "bg-[#dfccff] focus:ring-gray-400"}`}
			aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
		>
			<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`} />
		</button>
	);
}
