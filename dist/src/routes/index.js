"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var user_route_1 = __importDefault(require("./user.route"));
var admin_route_1 = __importDefault(require("./admin.route"));
var passport_1 = __importDefault(require("passport"));
var UserController_1 = __importDefault(require("../controller/UserController"));
var router = express_1.Router();
var prefix = '/api';
router.use(prefix + "/user", passport_1["default"].authenticate('oauth-bearer', { session: false }), user_route_1["default"]);
router.use(prefix + "/admin/login", function (req, res, next) { return UserController_1["default"].authAdmin(req, res, next); });
router.use(prefix + "/admin", passport_1["default"].authenticate('jwt', { session: false }), admin_route_1["default"]);
exports["default"] = router;
