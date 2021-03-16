import React, { useEffect, useState } from "react";

import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import Dashboard from "../Components/Dashboard";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import { verifyUser } from "../api";
function Routes() {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		(async () => {
			if (
				JSON.parse(localStorage.getItem("profile")!) &&
				JSON.parse(localStorage.getItem("profile")!).token
			) {
				const { token: oldToken } = JSON.parse(
					localStorage.getItem("profile")!
				);
				dispatch(verifyUser(oldToken));
			} else {
				dispatch({
					type: "LOGOUT",
				});
			}
			setLoading(false);
		})();
	}, [dispatch]);
	useEffect(() => {
		const handleInvalidToken = (e: any) => {
			if (e.key === "profile" && e.oldValue && !e.newValue) {
				dispatch({
					type: "LOGOUT",
				});
			}
		};
		setTimeout(() => {
			dispatch({
				type: "LOGOUT",
			});
		}, 1000 * 60 * 60);
		window.addEventListener("storage", handleInvalidToken, false);
		return () => {
			window.removeEventListener("storage", handleInvalidToken, false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			{!loading && (
				<Switch>
					<Route strict exact path="/" component={Dashboard} />
					<Route strict exact path="/signup" component={Signup} />
					<Route strict exact path="/login" component={Login} />
				</Switch>
			)}
		</>
	);
}

export default Routes;
