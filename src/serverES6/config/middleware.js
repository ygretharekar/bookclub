import express from "express";
import path from "path";
import session from "express-session";
import passport from "passport";
import fallback from "express-history-api-fallback";
import MongoStore from "connect-mongo";

import db from "./database";
import authRoutes from "../routes/authRoutes";

const mongoConnect = MongoStore(session);

export default app => {
	// app.use(express.static(path.join(__dirname, "../../build")));
	app.use(express.static("build"));
	app.use(fallback(path.join(__dirname, "../../build")));

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