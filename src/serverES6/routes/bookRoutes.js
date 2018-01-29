import express from "express";
import axios from "axios";
import dotenv from "dotenv";

import Book from "../models/books";

const app = express();

dotenv.config({path: __dirname + "../../../.env"});

app.post(
	"/api/book/add",
	(req, res, next) => {
		console.log("====================================");
		console.log(process.env.GOOGLE_BOOK_API);
		console.log("====================================");
		
		const { owner, book } = req.body;
		
		axios
			.get(
				"https://www.googleapis.com/books/v1/volumes",
				{
					params: {
						q: book,
						key: process.env.GOOGLE_BOOK_API
					}
				}
			)
			.then(
				resp => {
					const info = resp.data.items.slice(0,1);

					const books = info.map(
						b => (
							{
								title: b.volumeInfo.title,
								authors: b.volumeInfo.authors,
								image: b.volumeInfo.imageLinks.smallThumbnail,
								owner: owner,
								requests: []
							}
						)
					);
					console.log("====================================");
					console.log(books);
					console.log("====================================");
					return books;
				}
			)
			.then(
				books => {


					Book.findOne(
						{
							title: books[0].title
						},
						(err, bookInfo) => {
							if(err) return next(err);

							if(!bookInfo){
								books.map(
									book => {
										let data = new Book(book);
										data.save(
											err => {
												if(err) console.error(err);
											}
										);
									}
								);
								res.status(200).send(books);
							}
							else {
								let data = [
									{
										title: bookInfo.title,
										image: bookInfo.image,
										requests: [],
										owner: bookInfo.owner
									}
								];

								res.status(200).send(data);
							}
						}
					);
				}
			)
			.catch(err => console.error(err));
	}
);


app.get(
	"/api/getbooks",
	(req, res, next) => {

		Book.find(
			{},
			(err, docs) => {
				if(err) return next(err);
				console.log("====================================");
				console.log(docs);
				console.log("====================================");

				let data = docs.map(
					book => (
						{
							title: book.title,
							image: book.image,
							owner: book.owner,
							requests: book.requests
						}
					)
				);

				res.status(200).send(data);
			}
		);
	}
);

export default app;