import React from "react";
import { Provider } from "react-redux";
import Routes from "../Routes/Routes";
import { store } from "../Redux/store/store";
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
