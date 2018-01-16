import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "../../build")));

app.get(
	"/*", 
	(req, res) => {
		res.sendFile(path.join(__dirname, "../../build", "index.html"));
	}
);

app.listen(
	8100, 
	err => {
		if (err) 
			throw err;
		console.log("[INFO] Listening on *: 8100");
	}
);