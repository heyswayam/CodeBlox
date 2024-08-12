import React, { useState, useEffect } from "react";
import authService from "../appwrite/authService";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

function Redirecting() {
	const navigate = useNavigate();
	useEffect(() => {
		const promise = async () => {
			const passwordLess = await authService.getPasswordlesstoken();

			if (passwordLess) {
				toast.success("Sign-in successful!", {
					position: "bottom-right",
				});
				toast.warning("Please refresh the page if you are not logged in automatically.", {
					position: "bottom-right",
				});
				navigate("/");
			}
		};
		promise();
	}, []);
	return <div>Redirecting you to the page</div>;
}

export default Redirecting;
