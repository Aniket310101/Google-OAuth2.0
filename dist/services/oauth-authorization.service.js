"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var googleapis_1 = require("googleapis");
var OAuthAuthorizationService = /** @class */ (function () {
    function OAuthAuthorizationService() {
    }
    OAuthAuthorizationService.prototype.authorizeUser = function (scopes) {
        console.log('User Authorization Process Initiated!');
        try {
            OAuthAuthorizationService.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
        }
        catch (error) {
            throw new Error('Error occurred while initiating OAuth2.0 Client Instance!');
        }
        var authorizationUrl;
        try {
            var scopeURLs = scopes.map(function (scope) { return "".concat(process.env.SCOPE_BASE_URL, "/userinfo.").concat(scope); });
            authorizationUrl = OAuthAuthorizationService.oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopeURLs,
                include_granted_scopes: true
            });
        }
        catch (error) {
            throw new Error('Error occurred while generating Authorization URL!');
        }
        console.log('Authorization URL successfully generated!');
        return authorizationUrl;
    };
    OAuthAuthorizationService.prototype.generateTokens = function (q) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Generating Tokens...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, OAuthAuthorizationService.oauth2Client.getToken(q.code)];
                    case 2:
                        response = _a.sent();
                        tokens = response.tokens;
                        OAuthAuthorizationService.oauth2Client.setCredentials(tokens);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error('Error occurred while generating Tokens!');
                    case 4:
                        console.log('Tokens successfully Generated');
                        console.log(tokens);
                        return [2 /*return*/, tokens];
                }
            });
        });
    };
    OAuthAuthorizationService.prototype.getUserInfo = function (tokens) {
        return __awaiter(this, void 0, void 0, function () {
            var url, userInfo, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Fetching User Profile Info...');
                        url = process.env.USER_INFO_URL;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(url, {
                                headers: {
                                    'Authorization': "Bearer ".concat(tokens.access_token),
                                },
                            })];
                    case 2:
                        response = _a.sent();
                        userInfo = response.data;
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error('Error fetching User Info');
                    case 4:
                        console.log('User Info Fetched Successfully!');
                        return [2 /*return*/, userInfo];
                }
            });
        });
    };
    return OAuthAuthorizationService;
}());
exports.default = OAuthAuthorizationService;