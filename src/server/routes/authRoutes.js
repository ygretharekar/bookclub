"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwtConfig = require("../config/jwt-config");

var _jwtConfig2 = _interopRequireDefault(_jwtConfig);

var _validateUser = require("../validate/validateUser");

var _validateUser2 = _interopRequireDefault(_validateUser);

var _users = require("../models/users");

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = _express2.default.Router();

const createToken = username => _jsonwebtoken2.default.sign({ user: username }, _jwtConfig2.default, { expiresIn: 60 * 60 });

app.post("/register", (req, res, next) => {
	const userInfo = req.body;
	console.log("new registeration is: ", req.body);

	const valid = (0, _validateUser2.default)(userInfo);

	if (valid.isValid) {
		_users2.default.findOne({
			email: userInfo.email
		}, (err, user) => {

			if (err) return next(err);

			if (!user) {
				const passwordDigest = _bcrypt2.default.hashSync(userInfo.password, 10);

				user = new _users2.default({
					email: userInfo.email,
					username: userInfo.username,
					password: passwordDigest,
					accepted: [],
					rejected: []
				});

				user.save(err => {
					if (err) console.error(err);

					res.status(201).send({
						email: userInfo.email,
						username: userInfo.username,
						token: createToken(userInfo.username),
						accepted: [],
						rejected: []
					});
				});
			} else {
				console.log("====================================");
				console.log("user: ", user);
				console.log("====================================");

				res.status(201).send({
					email: user.email,
					username: user.username,
					token: createToken(user.username),
					accepted: user.accepted,
					rejected: user.rejected
				});
			}
		});
	} else {
		console.log("====================================");
		console.log("invalid registeration ", valid.errors);
		console.log("====================================");

		res.status(400).send("registration was invalid ", valid.errors);
	}
});

app.post("/login", (req, res) => {
	const { email, password } = req.body;

	_users2.default.findOne({
		email: email
	}, (err, user) => {
		if (user && _bcrypt2.default.compareSync(password, user.password)) {
			//console.log(JSON.stringify(user));
			res.status(201).send({
				token: createToken(user.username),
				email: user.email,
				username: user.username,
				accepted: user.accepted,
				rejected: user.rejected
			});
		} else if (!user) {
			res.status(401).send("invalid login attemt");
		} else {
			res.status(401).send("Password Incorrect");
		}
	});
});

exports.default = app;