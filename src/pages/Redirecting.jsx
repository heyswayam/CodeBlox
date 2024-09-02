import React, { useState, useEffect } from "react";
import authService from "../appwrite/authService";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

function Redirecting() {
	const navigate = useNavigate();
	useEffect(() => {
		const promise = async () => {
			try {
				const passwordLess = await authService.getPasswordlesstoken();
					// console.log("passwordless"+ passwordLess);
					

					// toast.warning("Please refresh the page if you are not logged in automatically.", {
					// 	position: "bottom-right",
					// });
					
					// // Add a delay before redirecting
					// setTimeout(() => {
						
					// 	toast.success("Sign-in successful!", {
					// 		position: "bottom-right",
					// 	});
					// }, 500); // 300ms  delay
					window.location.href = "/"; // unless you add a delay to this , the toast or anyother code doesn' works.So hadrcoded signin toast to app.jsx FIX IT SOMEDAY
			} catch (error) {
				toast.error("Error during passwordless sign-in: "+error,{
					position: "bottom-right",
				});
			}
			
		};
		promise();
	}, []);
	return <div>Redirecting you to the page</div>;
}

export default Redirecting;