"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_js_1 = require("../controllers/user.controller.js");
var router = (0, express_1.Router)();
router.route("/register").post(user_controller_js_1.default);
exports.default = router;
