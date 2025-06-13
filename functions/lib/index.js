"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextServer = void 0;
const https_1 = require("firebase-functions/v2/https");
const next_1 = __importDefault(require("next"));
const dev = process.env.NODE_ENV !== "production";
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
exports.nextServer = (0, https_1.onRequest)({ timeoutSeconds: 60 }, async (req, res) => {
    await app.prepare();
    handle(req, res);
});
