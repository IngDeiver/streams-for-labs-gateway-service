"use strict";
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var class_validator_1 = require("class-validator");
/**
 *
 * DTO for user
 * @category DTOs
 * @class UserDTO
 * @param {string} username - A username
 */
var UserDTO = /** @class */ (function () {
    /**
   * Creates an instance of UserDTO.
   * @param {string} username - the name user
   * @param {string} email - the email user
   * @memberof UserDTO
   */
    function UserDTO(username, email, oaid, password, sync_hour) {
        if (sync_hour === void 0) { sync_hour = null; }
        this.username = username;
        this.email = email;
        this.oaid = oaid;
        this.password = password;
        this.sync_hour = sync_hour;
    }
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], UserDTO.prototype, "username");
    __decorate([
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsEmail()
    ], UserDTO.prototype, "email");
    __decorate([
        class_validator_1.IsString()
    ], UserDTO.prototype, "oaid");
    __decorate([
        class_validator_1.IsString()
    ], UserDTO.prototype, "password");
    __decorate([
        class_validator_1.IsDate()
    ], UserDTO.prototype, "sync_hour");
    return UserDTO;
}());
exports["default"] = UserDTO;
