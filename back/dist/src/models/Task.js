"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = exports.TaskStatus = exports.Task = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Pending"] = 0] = "Pending";
    TaskStatus[TaskStatus["Completed"] = 1] = "Completed";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
const TaskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    hostId: { type: String, required: true },
    guestId: { type: [String], required: true },
    endDate: { type: Date, required: true },
    createdDate: { type: Date, required: true },
    targetDate: { type: Date, required: true },
});
const Task = mongoose_1.default.model("Tasks", TaskSchema);
exports.Task = Task;
class TaskModel {
    constructor(title, description, status, dueDate, createdDate, updatedDate, userId) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.userId = userId;
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
    getDescription() {
        return this.description;
    }
    getDueDate() {
        return this.dueDate;
    }
    getCreatedDate() {
        return this.createdDate;
    }
    getUpdatedDate() {
        return this.updatedDate;
    }
    getUserId() {
        return this.userId;
    }
    static fromJson(json) {
        return new TaskModel(json.title, json.description, json.status, new Date(json.dueDate), new Date(json.createdDate), new Date(json.updatedDate), json.userId);
    }
    toJson() {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            dueDate: this.dueDate,
            createdDate: this.createdDate,
            updatedDate: this.updatedDate,
            userId: this.userId
        };
    }
}
exports.TaskModel = TaskModel;
