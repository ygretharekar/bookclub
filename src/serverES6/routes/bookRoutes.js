import express from "express";
import axios from "axios";
import dotenv from "dotenv";

import Book from "../models/books";
import User from "../models/users";

const app = express();

dotenv.config({path: __dirname + "../../../.env"});

app.post(
	"/api/book/add",
	(req, res, next) => {
		
		
		const { owner, book } = req.body;
		
		if(owner.length) {	
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
	}
);

app.get(
	"/api/getbooks",
	(req, res, next) => {

		Book.find(
			{},
			(err, docs) => {
				if(err) return next(err);

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


app.post(
	"/api/request",
	(req, res) => {
		console.log("====================================");
		console.log(req.body);
		console.log("====================================");
		const { user, book } = req.body;


		Book.findOne(
			{
				title: book
			},
			(err, doc) => {
				if(err) console.error("Something went wrong while requesting!!", err);

				doc.requests = [
					...doc.requests,
					user
				];

				doc.save();

				console.log("====================================");
				console.log(doc);
				console.log("====================================");
				res.status(200).send(doc);

			}
		);
	}
);

app.post(
	"/api/confirmtrade",
	(req, res) => {
		console.log("====================================");
		console.log("sent body: ", req.body);
		console.log("====================================");

		const {book, owner, request, requests} = req.body;
		

		Book.findOne(
			{
				title: book
			},
			(err, doc) => {
				if(err) console.error("Something went wrong while changing user data", err);
				console.log("====================================");
				console.log("book: ", doc);
				console.log("====================================");
				
				let requests = doc.requests;

				doc.requests = requests.filter( book => book != request );

				doc.traded = true;

				doc.save();
			}
		);

		User.findOne(
			{
				username: request
			},
			(err, doc) => {
				if(err) console.error("Something went wrong while changing user data", err);

				doc.accepted = [
					...doc.accepted,
					{ title: book, owner: owner }
				];

				doc.save();

				console.log("====================================");
				console.log("user accepted: ", doc);
				console.log("====================================");

			}
		);

		requests.forEach(element => {

			if(element != request){

				User.findOne(
					{
						username: element
					},
					
					(err, doc) => {
						if(err) {
							console.error("Something went wrong while changing user data", err);
							return;
						}
						
						doc.rejected = [
							...doc.rejected,
							{ title: book, owner: owner }
						];
					
						doc.save();

						console.log("====================================");
						console.log("user rejected: ", doc);
						console.log("====================================");
					}
				);
			}
		});
		res.status(200).send({ owner: owner, title: book, request: request, traded: true });
	}

);

export default app;