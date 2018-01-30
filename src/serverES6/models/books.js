import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema(
	{
		title: {
			type: String,
			unique: true
		},
		author: String,
		image: String,
		owner: String,
		requests: [String]
	}
);

const Book = mongoose.model("Book", bookSchema);

export default Book;