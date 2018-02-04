"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	accepted: [{ title: String, owner: String }],
	rejected: [{ title: String, owner: String }],
	username: String,
	password: String

});

const User = _mongoose2.default.model("User", userSchema);

exports.default = User;