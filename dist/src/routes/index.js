"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var utils_1 = require("../utils");
var UserController_1 = __importDefault(require("../controller/UserController"));
// services
var admin_service_1 = __importDefault(require("./gateway/admin.service"));
var file_service_1 = __importDefault(require("./gateway/file.service"));
var photo_service_1 = __importDefault(require("./gateway/photo.service"));
var router = express_1.Router();
var prefix = '/api';
// --- Authorization layer ---
// login admin
router.use(prefix + "/admin/login", function (req, res, next) { return UserController_1["default"].authAdmin(req, res, next); });
// ---- Gateway layer (all request need are authenticated) ---
router.use(function (req, res, next) {
    var params = req.params;
    utils_1.logger.info("Redirect request to: " + req.url + (params.id ? "/" + params : ''));
    next();
});
// admin service redirect
router.use(prefix + "/admin", passport_1["default"].authenticate('jwt', { session: false }), admin_service_1["default"]);
// Storage service file redirect
router.use(prefix + "/file", passport_1["default"].authenticate('oauth-bearer', { session: false }), file_service_1["default"]);
// Storage service photo redirect (Carlos redirigelo al photo service)
router.use(prefix + "/photo", passport_1["default"].authenticate('oauth-bearer', { session: false }), photo_service_1["default"]);
exports["default"] = router;
