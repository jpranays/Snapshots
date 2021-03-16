import { Schema, model, Document } from "mongoose";

type UserModel = Document & {
	username: string;
	email: string;
	password: string;
	avatar: [number];
};
const UserSchema = new Schema(
	{
		username: String,
		email: String,
		password: String,
	},
	{
		_id: true,
		timestamps: true,
	}
);

export default model<UserModel>("Users", UserSchema);
