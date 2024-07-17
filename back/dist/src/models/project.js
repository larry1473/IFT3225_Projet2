"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    hostId: { type: String, required: true },
    gestId: { type: [String], required: true },
    description: { type: String, required: true },
    createDate: { type: Date, required: true },
    targetDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    requestJoin: { type: [String], required: true },
    tasks: [{
            title: { type: String, required: true },
            description: { type: String, required: true },
            hostId: { type: String, required: true },
            guestId: { type: [String], required: true },
            endDate: { type: Date, required: true },
            createdDate: { type: Date, required: true },
            targetDate: { type: Date, required: true },
        }], // Add the tasks property
});
const Project = mongoose_1.default.model('Projects', ProjectSchema);
exports.Project = Project;
