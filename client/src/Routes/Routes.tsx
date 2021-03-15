import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import Login from "../Components/Login";
import PrivateRoute from "../Components/PrivateRoute";
import Signup from "../Components/Signup";
import { useDispatch } from "react-redux";
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
				try {
					const {
						data: {
							decodedData: { _id, username },
						},
					} = await axios.post("/user/verifytoken/", {
						oldToken,
					});

					dispatch({
						type: "AUTH",
						payload: {
							token: oldToken,
							username: username,
							_id: _id,
							isLoggedIn: true,
						},
					});
				} catch (err) {
					dispatch({
						type: "LOGOUT",
					});
					console.log(err.message);
				}
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
		window.addEventListener("storage", handleInvalidToken, false);
		return function () {
			window.removeEventListener("storage", handleInvalidToken, false);
		};
	}, []);
	return (
		<>
			{!loading && (
				<Switch>
					<PrivateRoute strict exact path="/" component={Dashboard} />
					<Route strict exact path="/signup" component={Signup} />
					<Route strict exact path="/login" component={Login} />
				</Switch>
			)}
		</>
	);
}

export default Routes;
