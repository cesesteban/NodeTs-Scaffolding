"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var IRequestChangePassword = /** @class */ (function () {
    function IRequestChangePassword() {
        this.oldPassword = '';
        this.newPassword = '';
    }
    __decorate([
        (0, class_validator_1.IsString)({ message: 'oldPassword must be a string' }),
        (0, class_validator_1.Length)(1, 255, { message: 'oldPassword must be between 1 and 255 characters' }),
        __metadata("design:type", String)
    ], IRequestChangePassword.prototype, "oldPassword", void 0);
    __decorate([
        (0, class_validator_1.IsString)({ message: 'newPassword must be a string' }),
        (0, class_validator_1.Length)(1, 255, { message: 'newPassword must be between 1 and 255 characters' }),
        __metadata("design:type", String)
    ], IRequestChangePassword.prototype, "newPassword", void 0);
    return IRequestChangePassword;
}());
exports.default = IRequestChangePassword;
