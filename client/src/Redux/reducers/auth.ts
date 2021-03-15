const intialState: {
	authData: string;
	username: string;
	_id: string;
	isLoggedIn: boolean;
} = {
	authData: "",
	username: "",
	_id: "",
	isLoggedIn: false,
};
export const authReducer = (state = intialState, action: any) => {
	switch (action.type) {
		case "AUTH":
			localStorage.setItem("profile", JSON.stringify(action.payload));
			return {
				authData: action.payload.token,
				username: action.payload.username,
				_id: action.payload._id,
				isLoggedIn: action.payload.isLoggedIn,
			};
		case "LOGOUT":
			localStorage.removeItem("profile");
			return {
				authData: "",
				username: "",
				_id: "",
				isLoggedIn: false,
			};
		default:
			return state;
	}
};
