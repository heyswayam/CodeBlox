import React, { useState, useEffect } from "react";

export default function ThemeBtn() {
	const [theme, setTheme] = useState("dark");

	const lightMode = () => {
		setTheme("light");
	};
	const darkMode = () => {
		setTheme("dark");
	};
	const handleClick = (e) => {
		const darkModeStatus = e.target.checked ? "light" : "dark";
		setTheme(darkModeStatus);
		console.log(theme);
		if (darkModeStatus === "light") {
			darkMode();
		} else {
			lightMode();
		}
	};

	useEffect(() => {
		//for daisy ui
		document.querySelector("html").removeAttribute("data-theme");
		document.querySelector("html").setAttribute("data-theme", theme);
		//for tailwind css
		document.querySelector("html").classList.remove("light", "dark");
		document.querySelector("html").classList.add(theme);

		console.log(theme);
	}, [theme]);
	return (
<label
  htmlFor="AcceptConditions"
  onClick={handleClick}
  className="relative inline-block h-7 w-10 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-sky-900"
>
  <input type="checkbox" id="AcceptConditions" className="peer sr-only " defaultChecked />

  <span
    className="absolute inset-y-0 start-0 m-1 size-5 rounded-full bg-white transition-all peer-checked:start-3"
  ></span>
</label>


	);
}
