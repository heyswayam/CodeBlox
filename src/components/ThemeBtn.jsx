import React, { useState, useEffect } from "react";

export default function ThemeBtn() {
	const [theme, setTheme] = useState("dark");

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
	};

	useEffect(() => {
		document.querySelector("html").setAttribute("data-theme", theme);
		document.querySelector("html").classList.remove("light", "dark");
		document.querySelector("html").classList.add(theme);
	}, [theme]);

	return (
		<button
			onClick={toggleTheme}
			className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 ${theme === "dark" ? "bg-sky-900 focus:ring-sky-400" : "bg-gray-300 focus:ring-gray-400"}`}
			aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
		>
			<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`} />
		</button>
	);
}
