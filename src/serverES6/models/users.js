import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			lowercase: true
		},
		accepted: [{ title: String, owner: String }],
		rejected: [{ title: String, owner: String }],
		username: String,
		password: String
		
	}
);

const User = mongoose.model("User", userSchema);

export default User;