"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this._app = (0, express_1.default)();
    }
    start() {
        this._app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    }
    get app() {
        return this._app;
    }
}
const server = new Server();
exports.server = server;
