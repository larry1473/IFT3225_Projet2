"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const AppRoutes_1 = require("./routes/AppRoutes");
class Server {
    constructor() {
        this._app = (0, express_1.default)();
        this._appRoutes = AppRoutes_1.appRoutes;
        this.init();
    }
    start() {
        this._app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    }
    get app() {
        return this._app;
    }
    get appRoutes() {
        return this._appRoutes;
    }
    root() {
        this._app.get('/', (req, res) => {
            res.status(200).send("Hello World!");
        });
    }
    signIn() {
        this._app.use('/api/v1', this._appRoutes.routes);
    }
    init() {
        this._app.use(express_1.default.json());
        this.root();
        this.signIn();
    }
}
const server = new Server();
exports.server = server;
