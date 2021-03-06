import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
function PrivateRoute(props: any) {
	const { isLoggedIn } = useSelector(({ user }: any) => user);

	// return <>{isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />}</>;
	return <Route {...props} />;
}

export default PrivateRoute;
