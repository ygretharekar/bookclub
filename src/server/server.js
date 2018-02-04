"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _middleware = require("./config/middleware");

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

(0, _middleware2.default)(app);

app.listen(8100, err => {
	if (err) throw err;

	console.log("[INFO] Listening on *: 8100");
});