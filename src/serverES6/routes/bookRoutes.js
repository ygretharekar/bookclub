import express from "express";
import axios from "axios";

const app = express();

app.post(
	"/api/book/add",
	(req, res) => {
		console.log("====================================");
		console.log(req.body);
		console.log("====================================");


		axios
			.get(
				"https://www.googleapis.com/books/v1/volumes",
				{
					params: "immortals of meluha",
					key: process.env.GOOGLE_BOOK_KEY
				}
			)
			.then(
				resp => {
					console.log(resp);
				}

			)
		;

	}
);

export default app;