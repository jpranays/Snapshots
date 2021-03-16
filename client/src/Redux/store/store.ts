import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "../reducers/auth";
import { postReducer } from "../reducers/posts";

const rootReducer = combineReducers({
	user: authReducer,
	post: postReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
