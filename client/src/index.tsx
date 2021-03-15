import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./Components/app";

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.querySelector("#root")
);
