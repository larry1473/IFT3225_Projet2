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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = exports.appRoutes = void 0;
const express_1 = require("express");
const AppService_1 = require("../services/AppService");
const auth_1 = __importDefault(require("../middlewares/auth"));
const Task_1 = require("../models/Task");
const project_1 = require("../models/project");
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
                        message: result.message,
                        token: result.token,
                        username: result.userName
                    });
                }
                else if (result.message === "This email does not exist") {
                    res.status(500).send({
                        message: result.message
                    });
                }
                else if (result.message === "Wrong password") {
                    res.status(500).send({
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
    signUpGet(req, res) {
        try {
            res.status(200).send("welcome to the sign up page");
        }
        catch (err) {
            res.status(500).send("Internal Server Error");
        }
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).send("You have been logged out");
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    addTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskSchema = new Task_1.Task(req.body);
                const result = yield this.appService.addTask(taskSchema, req.params.id);
                res.status(200).send({
                    message: result.message,
                    project: result.project
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    addProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectSchema = new project_1.Project(req.body);
                const result = yield this.appService.addProject(projectSchema);
                res.status(200).send({
                    message: result.message
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    getProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.appService.getProjects();
                res.status(200).send({
                    message: result.message,
                    projects: result.projects
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("in delete project");
            try {
                const id = req.params.id;
                const result = yield this.appService.deleteProject(id);
                res.status(200).send({
                    message: result.message
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.appService.getTask(id);
                res.status(200).send({
                    message: result.message,
                    tasks: result.tasks
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error ");
            }
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, taskId } = req.params;
                const result = yield this.appService.deleteTask(projectId, taskId);
                res.status(200).send({
                    message: result.message,
                    project: result.project
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    getByIdTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, taskId } = req.params;
                const result = yield this.appService.getByIdTask(projectId, taskId);
                res.status(200).send({
                    message: result.message,
                    task: result.task
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    getGuests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.appService.getGuests(id);
                res.status(200).send({
                    message: result.message,
                    guests: result.guests
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    addGuest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const guestName = req.body.guestName;
                const result = yield this.appService.addGuest(id, guestName);
                res.status(200).send({
                    message: result.message
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    deleteGuest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, guestName } = req.params;
                const result = yield this.appService.deleteGuest(projectId, guestName);
                res.status(200).send({
                    message: result.message
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    getTaskGuests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, taskId } = req.params;
                const result = yield this.appService.getTaskGuests(projectId, taskId);
                res.status(200).send({
                    message: result.message,
                    guests: result.task
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    addTaskGuests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, taskId } = req.params;
                const guestName = req.body.guestName;
                const result = yield this.appService.addTaskGuests(projectId, taskId, guestName);
                res.status(200).send({
                    message: result.message
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    deleteTaskGuest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, taskId, guestName } = req.params;
                const result = yield this.appService.deleteTaskGuest(projectId, taskId, guestName);
                res.status(200).send({
                    message: result.message
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    getRequester(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId } = req.params;
                const result = yield this.appService.getRequester(projectId);
                res.status(200).send({
                    message: result.message,
                    requesters: result.requester
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    addRequester(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId } = req.params;
                const requesterName = req.body.requesterName;
                const result = yield this.appService.addRequester(projectId, requesterName);
                res.status(200).send({
                    message: result.message
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    deleteRequester(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, requesterName } = req.params;
                const result = yield this.appService.deleteRequester(projectId, requesterName);
                res.status(200).send({
                    message: result.message
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    changeDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, taskId } = req.params;
                const date = req.body.endDate;
                const result = yield this.appService.changeDate(projectId, taskId, date);
                res.status(200).send({
                    message: result.message,
                    project: result.project
                });
            }
            catch (err) {
                res.status(500).send("Internal Server Error");
            }
        });
    }
    get routes() {
        return this._routes;
    }
    init() {
        this._routes.post('/signup', this.signUp.bind(this));
        this._routes.post('/signin', this.signIn.bind(this));
        this._routes.get('/signin', this.signInGet.bind(this));
        this._routes.get('/signup', this.signUpGet.bind(this));
        this.routes.get('/logout', auth_1.default, this.logout.bind(this));
        //project endpoints
        this._routes.post('/projects', auth_1.default, this.addProject.bind(this));
        this._routes.get('/projects', this.getProjects.bind(this));
        this._routes.delete('/projects/:id', auth_1.default, this.deleteProject.bind(this));
        // project tasks endpoints
        this._routes.get('/projects/:id/tasks', auth_1.default, this.getTasks.bind(this));
        this._routes.post('/projects/:id', auth_1.default, this.addTask.bind(this));
        this._routes.delete('/projects/:projectId/tasks/:taskId', auth_1.default, this.deleteTask.bind(this));
        this._routes.get('/projects/:projectId/tasks/:taskId', auth_1.default, this.getByIdTask.bind(this));
        // project guests endpoints
        this.routes.get('/projects/:id/guests', auth_1.default, this.getGuests.bind(this));
        this._routes.post('/projects/:id/guests', auth_1.default, this.addGuest.bind(this));
        this._routes.delete('/projects/:projectId/guests/:guestName', auth_1.default, this.deleteGuest.bind(this));
        // project tasks guest endpoints
        this._routes.get('/projects/:projectId/tasks/:taskId/guests', auth_1.default, this.getTaskGuests.bind(this));
        this._routes.post('/projects/:projectId/tasks/:taskId/guests', auth_1.default, this.addTaskGuests.bind(this));
        this._routes.delete('/projects/:projectId/tasks/:taskId/guests/:guestName', auth_1.default, this.deleteTaskGuest.bind(this));
        this._routes.post('/projects/:projectId/tasks/:taskId', auth_1.default, this.changeDate.bind(this));
        // project requesters endpoints
        this._routes.get('/projects/:projectId/requesters', auth_1.default, this.getRequester.bind(this));
        this._routes.post('/projects/:projectId/requesters', auth_1.default, this.addRequester.bind(this));
        this._routes.delete('/projects/:projectId/requesters/:requesterName', auth_1.default, this.deleteRequester.bind(this));
    }
}
exports.AppRoutes = AppRoutes;
const appRoutes = new AppRoutes();
exports.appRoutes = appRoutes;
