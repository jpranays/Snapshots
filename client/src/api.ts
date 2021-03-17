import axios from "axios";
import { Dispatch } from "redux";

function logout(dispatch: Dispatch): void {
	dispatch({ type: "LOGOUT" });
}
export const allPosts: () => Function = () => async (dispatch: Dispatch) => {
	let { data } = await axios.get("/posts/", {});
	dispatch({ type: "FETCH", payload: data });
};
export const addPost = (formData: FormData) => async (dispatch: Dispatch) => {
	try {
		let { data } = await axios.post("/posts/addpost", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("profile")!).token
				}`,
			},
		});
		dispatch({ type: "ADD", payload: data });
	} catch (_err) {
		logout(dispatch);
	}
};
export const editPostLike = (_id: string) => async (dispatch: Dispatch) => {
	try {
		await axios.post(
			"/posts/updatepostlike",
			{ _id },
			{
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("profile")!).token
					}`,
				},
			}
		);
		dispatch({ type: "LIKE", payload: _id });
	} catch (_err) {
		logout(dispatch);
	}
};
export const editPost = (
	_id: string,
	formState: {
		title: string;
		content: string;
		image: File | null;
	},
	formData: FormData
) => async (dispatch: Dispatch) => {
	try {
		const {
			data: { image: myImage },
		} = await axios.post("/posts/updatepost", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("profile")!).token
				}`,
			},
		});
		dispatch({
			type: "EDIT",
			payload: {
				_id,
				myImage,
				...formState,
			},
		});
	} catch (_err) {
		logout(dispatch);
	}
};
export const deletePost = (_id: string) => async (dispatch: Dispatch) => {
	try {
		await axios.post(
			"/posts/deletepost",
			{ _id },
			{
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("profile")!).token
					}`,
				},
			}
		);
		dispatch({ type: "DELETE", payload: _id });
	} catch (_err) {
		logout(dispatch);
	}
};

export const signUP = (
	formstate: {
		username: string;
		password: string;
	},
	setMessage: Function,
	setLoading: Function,
	setOTPSent: Function
) => async () => {
	try {
		setMessage({
			class: "",
			msg: "",
		});
		const {
			data: { message },
			status,
		} = await axios.post("/user/signup/", formstate);

		if (status === 200) {
			setLoading(false);
			setMessage({
				class: "success",
				msg: message,
			});
			setOTPSent(true);
		}
	} catch (err) {
		setLoading(false);
		setMessage({
			class: "error",
			msg: "Something Went Wrong",
		});
	}
};

export const signIN = (
	formstate: {
		username: string;
		password: string;
	},
	setFormState: Function,
	setMessage: Function,
	history: History | any
) => async (dispatch: Dispatch) => {
	try {
		const {
			data: { token, username, _id },
			status,
		} = await axios.post("/user/signin/", formstate);
		setFormState({
			username: "",
			password: "",
		});
		if (status === 200) {
			dispatch({
				type: "AUTH",
				payload: { token, username, _id, isLoggedIn: true },
			});
			history.push("/");
		}
	} catch (err) {
		setMessage({
			class: "error",
			msg: "Something Went Wrong",
		});
	}
};

export const verifyUser = (oldToken: string) => async (dispatch: Dispatch) => {
	try {
		const {
			data: {
				decodedData: { _id, username, avatar },
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
				avatar: avatar,
			},
		});
	} catch (err) {
		dispatch({
			type: "LOGOUT",
		});
		console.log(err.message);
	}
};
