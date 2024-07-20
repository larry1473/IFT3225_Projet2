import mongoose,{ Document , Schema } from "mongoose";

enum TaskStatus {
    'Pending',
    'Completed',
}

interface ITask extends Document {
   title: string;
   description: string;
   hostName: string;
   guestNames: string[];
   endDate: Date;
   createdDate: Date;
   targetDate: Date;
}

const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    hostName: { type: String, required: true },
    guestNames: { type: [String], required: true },
    endDate: { type: Date, required: true },
    createdDate: { type: Date, required: true },
    targetDate: { type: Date, required: true },
    
});

const Task = mongoose.model<ITask>("Tasks", TaskSchema);



class TaskModel {
    private title: string;
    private description: string;
    private status: TaskStatus;
    private dueDate: Date;
    private createdDate: Date;
    private updatedDate: Date;
    private userId: string;

    constructor(title: string, description: string, status: TaskStatus, dueDate: Date, createdDate: Date, updatedDate: Date, userId: string) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.userId = userId;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getDueDate(): Date {
        return this.dueDate;
    }

    public getCreatedDate(): Date {
        return this.createdDate;
    }

    public getUpdatedDate(): Date {
        return this.updatedDate;
    }

    public getUserId(): string {
        return this.userId;
    }

    public static fromJson(json: any): TaskModel {
        return new TaskModel(json.title, json.description, json.status, new Date(json.dueDate), new Date(json.createdDate), new Date(json.updatedDate), json.userId);   
    }

    public toJson(): any {
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

export { Task, ITask, TaskStatus, TaskModel, TaskSchema };

