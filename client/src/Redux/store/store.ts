import { createStore, combineReducers } from "redux";
import { authReducer } from "../reducers/auth";
import { postReducer } from "../reducers/posts";

const rootReducer = combineReducers({
	user: authReducer,
	post: postReducer,
});

export const store = createStore(rootReducer);
