"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _books = require("../models/books");

var _books2 = _interopRequireDefault(_books);

var _users = require("../models/users");

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

_dotenv2.default.config({ path: __dirname + "../../../.env" });

app.post("/api/book/add", (req, res, next) => {

	const { owner, book } = req.body;

	if (owner.length) {
		_axios2.default.get("https://www.googleapis.com/books/v1/volumes", {
			params: {
				q: book,
				key: process.env.GOOGLE_BOOK_API
			}
		}).then(resp => {
			const info = resp.data.items.slice(0, 1);

			const books = info.map(b => ({
				title: b.volumeInfo.title,
				authors: b.volumeInfo.authors,
				image: b.volumeInfo.imageLinks.smallThumbnail,
				owner: owner,
				requests: []
			}));
			console.log("====================================");
			console.log(books);
			console.log("====================================");
			return books;
		}).then(books => {

			_books2.default.findOne({
				title: books[0].title
			}, (err, bookInfo) => {
				if (err) return next(err);

				if (!bookInfo) {
					books.map(book => {
						let data = new _books2.default(book);
						data.save(err => {
							if (err) console.error(err);
						});
					});
					res.status(200).send(books);
				} else {
					let data = [{
						title: bookInfo.title,
						image: bookInfo.image,
						requests: [],
						owner: bookInfo.owner
					}];

					res.status(200).send(data);
				}
			});
		}).catch(err => console.error(err));
	}
});

app.get("/api/getbooks", (req, res, next) => {

	_books2.default.find({}, (err, docs) => {
		if (err) return next(err);

		let data = docs.map(book => ({
			title: book.title,
			image: book.image,
			owner: book.owner,
			requests: book.requests
		}));

		res.status(200).send(data);
	});
});

app.post("/api/request", (req, res) => {
	console.log("====================================");
	console.log(req.body);
	console.log("====================================");
	const { user, book } = req.body;

	_books2.default.findOne({
		title: book
	}, (err, doc) => {
		if (err) console.error("Something went wrong while requesting!!", err);

		doc.requests = [...doc.requests, user];

		doc.save();

		console.log("====================================");
		console.log(doc);
		console.log("====================================");
		res.status(200).send(doc);
	});
});

app.post("/api/confirmtrade", (req, res) => {
	console.log("====================================");
	console.log("sent body: ", req.body);
	console.log("====================================");

	const { book, owner, request, requests } = req.body;

	_books2.default.findOne({
		title: book
	}, (err, doc) => {
		if (err) console.error("Something went wrong while changing user data", err);
		console.log("====================================");
		console.log("book: ", doc);
		console.log("====================================");

		let requests = doc.requests;

		doc.requests = requests.filter(book => book != request);

		doc.traded = true;

		doc.save();
	});

	_users2.default.findOne({
		username: request
	}, (err, doc) => {
		if (err) console.error("Something went wrong while changing user data", err);

		doc.accepted = [...doc.accepted, { title: book, owner: owner }];

		doc.save();

		console.log("====================================");
		console.log("user accepted: ", doc);
		console.log("====================================");
	});

	requests.forEach(element => {

		if (element != request) {

			_users2.default.findOne({
				username: element
			}, (err, doc) => {
				if (err) {
					console.error("Something went wrong while changing user data", err);
					return;
				}

				doc.rejected = [...doc.rejected, { title: book, owner: owner }];

				doc.save();

				console.log("====================================");
				console.log("user rejected: ", doc);
				console.log("====================================");
			});
		}
	});
	res.status(200).send({ owner: owner, title: book, request: request, traded: true });
});

exports.default = app;