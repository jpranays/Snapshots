import React from "react";
import { Provider } from "react-redux";
import { store } from "../Redux/reducers/posts";
import Routes from "../Routes/Routes";
function app() {
	return (
		<>
			<Provider store={store}>
				<Routes />
			</Provider>
		</>
	);
}

export default app;
