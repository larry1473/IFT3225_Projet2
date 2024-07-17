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
exports.AppService = void 0;
const user_1 = require("../models/user");
const Database_1 = __importDefault(require("./Database"));
const validator_1 = __importDefault(require("validator"));
const zxcvbn_1 = __importDefault(require("zxcvbn"));
const AuthService_1 = __importDefault(require("./AuthService"));
const project_1 = require("../models/project");
class AppService {
    constructor() {
    }
    validateEmail(email) {
        return validator_1.default.isEmail(email);
    }
    validatePassword(password) {
        return (0, zxcvbn_1.default)(password).score >= 3;
    }
    signUp(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = yield Database_1.default.getInstance('dbName');
            try {
                // Validate email format
                if (!this.validateEmail(email)) {
                    return { success: false, message: 'Invalid email format' };
                }
                // Validate password strength
                if (!this.validatePassword(password)) {
                    return { success: false, message: 'Password is too weak' };
                }
                // check if the user email  already exists
                const existingUser = yield user_1.User.findOne({ email });
                if (existingUser) {
                    return { success: false, message: "This email already exists" };
                }
                else {
                    const user = new user_1.User({ name, email, password });
                    yield user.save();
                    return { success: true, message: "User signed up successfully" };
                }
            }
            catch (err) {
                return { success: false, message: 'An error occurred during sign up' };
                console.error("An error occured during the signUp", err);
            }
            finally {
                this.database.close();
            }
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = yield Database_1.default.getInstance('dbName');
            try {
                const token = yield AuthService_1.default.signIn(email, password);
                return { success: true, message: 'User signed in successfully', token };
            }
            catch (err) {
                const error = err;
                return { success: false, message: error.message };
                console.error("An error occured during the signIn", error);
            }
            finally {
                this.database.close();
            }
        });
    }
    addTask(task, id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = yield Database_1.default.getInstance('dbName');
            try {
                const project = yield project_1.Project.findById(id);
                if (!project) {
                    return { success: false, message: 'Project not found' };
                }
                else {
                    project.tasks.push(task);
                    yield project.save();
                }
                console.log("Task added successfully");
                return { success: true, message: 'Task added successfully' };
            }
            catch (err) {
                return { success: false, message: 'An error occurred during add task' };
                console.error("An error occured during the addTask", err);
            }
            finally {
                this.database.close();
            }
        });
    }
    addProject(project) {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = yield Database_1.default.getInstance('dbName');
            try {
                yield project.save();
                console.log("Project added successfully");
                return { success: true, message: 'Project added successfully' };
            }
            catch (err) {
                return { success: false, message: 'An error occurred during add project' };
                console.error("An error occured during the addProject", err);
            }
            finally {
                this.database.close();
            }
        });
    }
    getProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = yield Database_1.default.getInstance('dbName');
            try {
                const projects = yield project_1.Project.find();
                return { success: true, message: 'Projects retrieved successfully', projects };
            }
            catch (err) {
                return { success: false, message: 'An error occurred during get projects' };
                console.error("An error occured during the getProjects", err);
            }
            finally {
                this.database.close();
            }
        });
    }
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = yield Database_1.default.getInstance('dbName');
            try {
                const project = yield project_1.Project.findByIdAndDelete(id);
                if (!project) {
                    return { success: false, message: 'Project not found' };
                }
                return { success: true, message: 'Project deleted successfully' };
            }
            catch (err) {
                return { success: false, message: 'An error occurred during delete project' };
                console.error("An error occured during the deleteProject", err);
            }
            finally {
                this.database.close();
            }
        });
    }
    getTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = yield Database_1.default.getInstance('dbName');
            try {
                const project = yield project_1.Project.findById(id);
                if (!project) {
                    return { success: false, message: 'project not found' };
                }
                return { success: true, message: 'Task retrieved successfully', tasks: project.tasks };
            }
            catch (err) {
                return { success: false, message: 'An error occurred during get task' };
                console.error("An error occured during the getTask", err);
            }
            finally {
                this.database.close();
            }
        });
    }
    deleteTask(projectId, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = yield Database_1.default.getInstance('dbName');
            try {
                const project = yield project_1.Project.findById(projectId);
                if (!project) {
                    return { success: false, message: 'Project not found' };
                }
                const taskIndex = project.tasks.findIndex((task) => task._id.toString() === taskId);
                if (taskIndex === -1) {
                    return { success: false, message: 'Task not found' };
                }
                project.tasks.splice(taskIndex, 1);
                yield project.save();
                return { success: true, message: 'Task deleted successfully' };
            }
            catch (err) {
                return { success: false, message: 'An error occurred during delete task' };
                console.error("An error occured during the deleteTask", err);
            }
            finally {
                this.database.close();
            }
        });
    }
    getByIdTask(projectId, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = yield Database_1.default.getInstance('dbName');
            try {
                const project = yield project_1.Project.findById(projectId);
                if (!project) {
                    return { success: false, message: 'Project not found' };
                }
                const task = project.tasks.find((task) => task._id.toString() === taskId);
                if (!task) {
                    return { success: false, message: 'Task not found' };
                }
                return { success: true, message: 'Task retrieved successfully', task };
            }
            catch (err) {
                return { success: false, message: 'An error occurred during get by id task' };
                console.error("An error occured during the getByIdTask", err);
            }
            finally {
                this.database.close();
            }
        });
    }
}
exports.AppService = AppService;
