import React from "react";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import { store } from "../Redux/reducers/posts";
function app() {
	return (
		<>
			<Provider store={store}>
				<Dashboard />
			</Provider>
		</>
	);
}

export default app;
