import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

import secret from "../config/jwt-config";
import validate from  "../validate/validateUser";

import User from "../models/users";


const app = express.Router();

const createToken = username => jwt.sign({user: username}, secret, {expiresIn: 60*60});

app.post(
	"/register",
	(req, res, next) => {
		const userInfo = req.body;
		console.log("new registeration is: ", req.body);

		const valid = validate(userInfo);

		if(valid.isValid){
			User.findOne(
				{
					email: userInfo.email
				},
				(err, user) => {
					if(err) return next(err);

					if(!user){
						const passwordDigest = bcrypt.hashSync(userInfo.password, 10);

						user = new User(
							{
								email: userInfo.email,
								username: userInfo.username,
								password: passwordDigest
							}
						);
						
						user.save(
							err => {
								if(err) console.error(err);

								res.status(201).send(
									{	
										email: userInfo.email,
										username: userInfo.username,
										token: createToken(userInfo.username)
									}
								);
							}
						);
					}
					else {
						console.log("====================================");
						console.log("user: ", user);
						console.log("====================================");

						res.status(201).send(
							{
								email: user.email,
								username: user.username,
								token: createToken(user.username)
							}
						);
					}
				}
			);
		}
		else{
			console.log("====================================");
			console.log("invalid registeration ", valid.errors);
			console.log("====================================");

			res.status(400).send("registration was invalid ", valid.errors);
		} 
	}
);

app.post(
	"/login",
	(req, res) => {
		const { email, password } = req.body;

		User.findOne(
			{
				email: email
			},
			(err, user) => {
				if(user && bcrypt.compareSync(password, user.password)) {
					//console.log(JSON.stringify(user));
					res.status(201).send(
						{
							token: createToken(user.username),
							email: user.id,
							username: user.username
						}
					);
				}

				else if(!user) {
					res.status(401).send("invalid login attemt");
				}

				else {
					res.status(401).send("Password Incorrect");
				}
			}
		);
	}
);

export default app;