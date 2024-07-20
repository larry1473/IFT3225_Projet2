import mongoose, { Document, Schema } from 'mongoose';
import { ITask,  TaskSchema } from './Task';

interface IProject extends Document {
    name: string;
    hostName: string;
    guestNames: string[];
    description: string;
    createDate: Date;
    targetDate: Date;
    endDate: Date;
    requestJoin: string[];
    tasks: ITask[];
}

const ProjectSchema = new Schema<IProject>({
    name: { type: String, required: true },
    hostName: { type: String, required: true },
    guestNames: { type: [String], required: true },
    description: { type: String, required: true },
    createDate: { type: Date, required: false },
    targetDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    requestJoin: { type: [String], required: true },
    tasks: { type: [TaskSchema], required: true } // Correct usage of TaskSchema
});

const Project = mongoose.model<IProject>('Project', ProjectSchema);

export { IProject, Project };
