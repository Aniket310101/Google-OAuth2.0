"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var UuidHelper = /** @class */ (function () {
    function UuidHelper() {
    }
    UuidHelper.prototype.generate = function () {
        return (0, uuid_1.v4)();
    };
    return UuidHelper;
}());
exports.default = UuidHelper;
