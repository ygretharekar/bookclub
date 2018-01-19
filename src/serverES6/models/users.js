import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			lowercase: true
		},
		username: String,
		password: String
	}
);

const User = mongoose.model("User", userSchema);

export default User;