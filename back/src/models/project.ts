import mongoose, { Document } from 'mongoose';
import { Task } from './Task';
interface IProject extends Document {
    name: string;
    hostId: string;
    gestId: string[];
    description: string;
    createDate: Date;
    targetDate: Date;
    endDate: Date;
    requestJoin: string[];
    tasks: typeof Task[]; // Add the type for the tasks property
}

const ProjectSchema = new mongoose.Schema({
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

const Project = mongoose.model<IProject>('Projects', ProjectSchema);

export { IProject, Project };

