import express from "express";
import path from "path";
import session from "express-session";
import passport from "passport";
// import fallback from "express-history-api-fallback";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import cors from "cors";

import db from "./database";
import authRoutes from "../routes/authRoutes";
import bookRoutes from "../routes/bookRoutes";

const mongoConnect = MongoStore(session);

export default app => {
	app.use(express.static(path.join(__dirname, "../../build")));
	app.use(express.static("build"));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(cors());
	app.use(session(
		{
			secret: "some secret",
			resave: true,
			secure: false,
			saveUninitialized: true,
			store: new mongoConnect(
				{
					mongooseConnection: db
				}
			)
		}
	));

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser((user, done) => done(null, user) );
	passport.deserializeUser((user, done) => done(null, user) );

	app.use(authRoutes);
	app.use(bookRoutes);

	app.use(
		(err, req, res, next) => {
			res.status(err.status || 500).json(
				{
					error: {
						message: err.message
					}
				}
			);
			next();
		}
	);
};