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
var IRequestUpdateUser = /** @class */ (function () {
    function IRequestUpdateUser() {
        this.username = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.roleId = 0;
        this.countryId = 0;
    }
    __decorate([
        (0, class_validator_1.IsString)({ message: 'Username must be a string' }),
        (0, class_validator_1.Length)(1, 255, { message: 'Username must be between 1 and 255 characters' }),
        __metadata("design:type", String)
    ], IRequestUpdateUser.prototype, "username", void 0);
    __decorate([
        (0, class_validator_1.IsString)({ message: 'First name must be a string' }),
        (0, class_validator_1.Length)(1, 255, { message: 'First name must be between 1 and 255 characters' }),
        __metadata("design:type", String)
    ], IRequestUpdateUser.prototype, "firstName", void 0);
    __decorate([
        (0, class_validator_1.IsString)({ message: 'Last name must be a string' }),
        (0, class_validator_1.Length)(1, 255, { message: 'Last name must be between 1 and 255 characters' }),
        __metadata("design:type", String)
    ], IRequestUpdateUser.prototype, "lastName", void 0);
    __decorate([
        (0, class_validator_1.IsString)({ message: 'Emal must be a string' }),
        (0, class_validator_1.Length)(1, 255, { message: 'Email must be between 1 and 255 characters' }),
        __metadata("design:type", String)
    ], IRequestUpdateUser.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 12 }, { message: 'role_id must be a number' }),
        __metadata("design:type", Number)
    ], IRequestUpdateUser.prototype, "roleId", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 12 }, { message: 'country_id must be a number' }),
        __metadata("design:type", Number)
    ], IRequestUpdateUser.prototype, "countryId", void 0);
    return IRequestUpdateUser;
}());
exports.default = IRequestUpdateUser;
