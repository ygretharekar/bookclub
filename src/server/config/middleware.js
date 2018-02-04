"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _connectMongo = require("connect-mongo");

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _database = require("./database");

var _database2 = _interopRequireDefault(_database);

var _authRoutes = require("../routes/authRoutes");

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _bookRoutes = require("../routes/bookRoutes");

var _bookRoutes2 = _interopRequireDefault(_bookRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fallback from "express-history-api-fallback";
const mongoConnect = (0, _connectMongo2.default)(_expressSession2.default);

exports.default = app => {
	app.use(_express2.default.static(_path2.default.join(__dirname, "../../build")));
	app.use(_express2.default.static("build"));
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use(_bodyParser2.default.json());
	app.use((0, _cors2.default)());
	app.use((0, _expressSession2.default)({
		secret: "some secret",
		resave: true,
		secure: false,
		saveUninitialized: true,
		store: new mongoConnect({
			mongooseConnection: _database2.default
		})
	}));

	app.use(_passport2.default.initialize());
	app.use(_passport2.default.session());

	_passport2.default.serializeUser((user, done) => done(null, user));
	_passport2.default.deserializeUser((user, done) => done(null, user));

	app.use(_authRoutes2.default);
	app.use(_bookRoutes2.default);

	app.use((err, req, res, next) => {
		res.status(err.status || 500).json({
			error: {
				message: err.message
			}
		});
		next();
	});
};