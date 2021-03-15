import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
function Routes() {
	return (
		<Switch>
			<Route strict exact path="/" component={Dashboard} />
			<Route strict exact path="/signup" component={Signup} />
			<Route strict exact path="/login" component={Login} />
		</Switch>
	);
}

export default Routes;
