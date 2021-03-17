import { Schema, model, Document } from "mongoose";

type UserModel = Document & {
	username: string;
	email: string;
	password: string;
	loginToken: {
		token: string;
		tokenCreated: Date;
	};
	emailToken: {
		token: string;
		tokenCreated: Date;
	};
	verified: boolean;
};
const UserSchema = new Schema(
	{
		username: String,
		email: String,
		password: String,
		loginToken: {
			token: String,
			tokenCreated: {
				type: Date,
				default: Date.now(),
			},
		},
		emailToken: {
			token: String,
			tokenCreated: { type: Date, default: Date.now() },
		},
		verified: {
			type: Boolean,
			default: false,
		},
	},
	{
		_id: true,
		timestamps: true,
	}
);

export default model<UserModel>("Users", UserSchema);
