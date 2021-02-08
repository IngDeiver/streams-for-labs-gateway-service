"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var controller_1 = require("../controller");
var middlewares_1 = require("../middlewares");
var dtos_1 = require("../dtos");
var passport_1 = __importDefault(require("passport"));
/**
 *
 * Managament the routes of user
 * @category Routes
 * @class UserRouter
 * @implements {IRoute}
 */
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router();
        this.pathIdParam = '/:id';
        this.createRoutes();
    }
    UserRouter.prototype.createRoutes = function () {
        // get user by Id
        this.router.get(this.pathIdParam, middlewares_1.isDefinedParamMiddleware(), function (req, res, next) { return controller_1.UserControler
            .getById(req, res, next); });
        // list users
        this.router.get('/', function (req, res, next) { return controller_1.UserControler
            .list(req, res, next); });
        // Authenticate user
        this.router.post('/auth', passport_1["default"].authenticate('oauth-bearer', { session: false }), function (req, res) {
            res.json(req.user);
        });
        // Update user
        this.router.put(this.pathIdParam, middlewares_1.isDefinedParamMiddleware(), middlewares_1.validationMiddleware(dtos_1.UserDTO, true), function (req, res, next) { return controller_1.UserControler
            .updateById(req, res, next); });
        // Remove user
        this.router["delete"](this.pathIdParam, middlewares_1.isDefinedParamMiddleware(), function (req, res, next) { return controller_1.UserControler
            .removeById(req, res, next); });
    };
    return UserRouter;
}());
exports["default"] = new UserRouter().router;
