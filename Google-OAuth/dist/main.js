"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var oauth_authorization_controller_1 = __importDefault(require("./controllers/oauth-authorization.controller"));
require('dotenv').config();
var express = require("express");
var app = express();
app.get('/oauth-authorization', new oauth_authorization_controller_1.default().authorizeUser);
app.get('/oauth2callback', new oauth_authorization_controller_1.default().generateTokens);
app.listen(3000, function () {
    console.log("Listening on http://localhost:3000/oauth-authorization?scopes=email,profile");
});
