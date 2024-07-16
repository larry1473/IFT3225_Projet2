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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = exports.appRoutes = void 0;
const express_1 = require("express");
const AppService_1 = require("../services/AppService");
class AppRoutes {
    constructor() {
        this._routes = (0, express_1.Router)();
        this.appService = new AppService_1.AppService();
        this.init();
    }
    /**
     * this function is used to sign up a user
     * call the service method signUp to sign up a user
     * @param req
     * @param res
     */
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const result = yield this.appService.signUp(name, email, password);
                if (result.success) {
                    res.status(201).send({
                        message: result.message
                    });
                }
                else if (result.message === "This email already exists") {
                    res.status(409).send({
                        message: result.message
                    });
                }
                else if (result.message === "Invalid email format" || result.message === "Password is too weak") {
                    res.status(400).send({
                        message: result.message
                    });
                }
                else {
                    res.status(500).send({
                        message: result.message
                    });
                }
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield this.appService.signIn(email, password);
                if (result.success) {
                    res.status(200).send({
                        message: result.message
                    });
                }
                else if (result.message === "This email does not exist") {
                    res.status(404).send({
                        message: result.message
                    });
                }
                else if (result.message === "Wrong password") {
                    res.status(401).send({
                        message: result.message
                    });
                }
                else {
                    res.status(500).send({
                        message: result.message
                    });
                }
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    signInGet(req, res) {
        try {
            res.status(200).send("welcome to the sign in page");
        }
        catch (err) {
            res.status(500).send("Internal Server Error");
        }
    }
    get routes() {
        return this._routes;
    }
    init() {
        this._routes.post('/signup', this.signUp.bind(this));
        this._routes.post('/signin', this.signIn.bind(this));
        this._routes.get('/signin', this.signInGet.bind(this));
    }
}
exports.AppRoutes = AppRoutes;
const appRoutes = new AppRoutes();
exports.appRoutes = appRoutes;
