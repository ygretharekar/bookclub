"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

_dotenv2.default.config({ silence: true });

try {
	_mongoose2.default.connect(process.env.MONGO_HOST);
} catch (err) {
	_mongoose2.default.createConnection(process.env.MONGO_HOST);
}

const db = _mongoose2.default.connection;

db.once("open", () => console.log("connected to mongodb")).on("error", err => {
	console.log(`Error while connecting to mongo ${err.message}`);
	throw err;
});

exports.default = db;