"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const bookSchema = new Schema({
	title: {
		type: String,
		unique: true
	},
	author: String,
	image: String,
	owner: String,
	requests: [String],
	traded: Boolean
});

const Book = _mongoose2.default.model("Book", bookSchema);

exports.default = Book;