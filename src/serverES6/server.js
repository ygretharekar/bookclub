import express from "express";
import appConfig from "./config/middleware";

const app = express();

appConfig(app);

app.listen(
	8100,
	err => {
		if (err) throw err;

		console.log("[INFO] Listening on *: 8100");
	}
);