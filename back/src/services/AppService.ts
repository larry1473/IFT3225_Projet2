import { User } from "../models/user";
import Database from "./Database";
import validator from 'validator';
import zxcvbn from 'zxcvbn';
import AuthServices from "./AuthService";
import { TaskModel,Task } from "../models/Task";
import { Schema } from "mongoose";
import { Project } from "../models/project";
import bcrypt from 'bcryptjs';
export class AppService{
    
    
    
    
    
    
    
    

    private database:Database|undefined;
    constructor(){
    }

    private validateEmail(email:string):boolean{
        return validator.isEmail(email);
    }

    private validatePassword(password:string):boolean{
        return zxcvbn(password).score >= 3;
    }



    public async signUp(name:string,email:string,password:string):Promise<{success:boolean; message:String}>{
        this.database = await Database.getInstance('dbName');
        try{
             // Validate email format
            if (!this.validateEmail(email)) {
                return { success: false, message: 'Invalid email format' };
            }

            // Validate password strength
            if (!this.validatePassword(password)) {
                return { success: false, message: 'Password is too weak' };
            }
            // check if the user email  already exists
            const existingUser = await User.findOne({email});
            if(existingUser){
                return  {success:false, message:"This email already exists"};
            }
            else{
                try{
                    const hash = await bcrypt.hash(password,10);
                    const user = new User({name,email,password:hash});
                    await user.save();
                    return {success:true, message:"User signed up successfully"};
                }catch(err){
                    return { success: false, message: 'An error occurred during sign up' };
                    console.error("An error occured during the signUp",err);
                }
                // const user = new User({name,email,password});
                // await user.save();
                // return {success:true, message:"User signed up successfully"};

            }
           
        }
        catch(err){
            return { success: false, message: 'An error occurred during sign up' };
            console.error("An error occured during the signUp",err);
        }
        finally{
            this.database.close();
        }
       
    }

    public async signIn(email: any, password: any):Promise<{success:boolean; message:String; token?:string }> {
        this.database = await Database.getInstance('dbName');
        try {
            const token = await AuthServices.signIn(email,password);
            return { success: true, message: 'User signed in successfully', token };

           
        }
        catch (err) {
            const error = err as Error;
            return { success: false, message: error.message };
            
            console.error("An error occured during the signIn", error);
        }
        finally{
            this.database.close();
        }
       
    }

    public async addTask(task:any,id:string ):Promise<{success:boolean; message:String}>{
        this.database = await Database.getInstance('dbName');
        try {
           
            const project = await Project.findById(id);
            if (!project) {
                return { success: false, message: 'Project not found' };
            }
            else{
                project.tasks.push(task);
                await project.save();
            }
            console.log("Task added successfully");
            return { success: true, message: 'Task added successfully' };
        }
        catch (err) {
            return { success: false, message: 'An error occurred during add task' };
            console.error("An error occured during the addTask", err);
        }   
        finally{
            this.database.close();
        }
      
    }

    public async addProject(project: any):Promise<{ success: boolean; message: String; }>{
       this.database = await Database.getInstance('dbName');
       try{
              await project.save();
              console.log("Project added successfully");
              return { success: true, message: 'Project added successfully' };
       }
       catch(err){
           return { success: false, message: 'An error occurred during add project' };
           console.error("An error occured during the addProject", err);
       }
       finally{
           this.database.close();
       }

    }

    public async getProjects():Promise<{ success: boolean; message: String; projects?: any[]; }>{
        this.database = await Database.getInstance('dbName');
        try {
            const projects = await Project.find();
            return { success: true, message: 'Projects retrieved successfully', projects };
        }
        catch (err) {
            return { success: false, message: 'An error occurred during get projects' };
            console.error("An error occured during the getProjects", err);
        }
        finally{
            this.database.close();
        }
    }

    public async deleteProject(id: string):Promise<{ success: boolean; message: String; }>{
        this.database = await Database.getInstance('dbName');
        try {
            const project = await Project.findByIdAndDelete(id);
            if (!project) {
                return { success: false, message: 'Project not found' };
            }
            return { success: true, message: 'Project deleted successfully' };
        }
        catch(err){
            return { success: false, message: 'An error occurred during delete project' };
            console.error("An error occured during the deleteProject", err);
        }
        finally{
            this.database.close();
        }
    }

    public async getTask(id: string):Promise<{ success: boolean; message: String; tasks?: any; }>{
        this.database = await Database.getInstance('dbName');
        try {
            const project = await Project.findById(id);
            if (!project) {
                return { success: false, message: 'project not found' };
            }
            return { success: true, message: 'Task retrieved successfully', tasks: project.tasks };
        }
        catch(err){
            return { success: false, message: 'An error occurred during get task' };
            console.error("An error occured during the getTask", err);
        }
        finally{
            this.database.close();
        }
    }

    public async deleteTask  (projectId: string, taskId: string):Promise<{ success: boolean; message: String; }>{
        this.database = await Database.getInstance('dbName');
        try {
            const project = await Project.findById(projectId);
            if (!project) {
                return { success: false, message: 'Project not found' };
            }
            const taskIndex = project.tasks.findIndex((task: any) => task._id.toString() === taskId);
            if (taskIndex === -1) {
                return { success: false, message: 'Task not found' };
            }
            project.tasks.splice(taskIndex, 1);
            await project.save();
            return { success: true, message: 'Task deleted successfully' };
        }
        catch(err){
            return { success: false, message: 'An error occurred during delete task' };
            console.error("An error occured during the deleteTask", err);
        }
        finally{
            this.database.close();
        }
    }

    public async getByIdTask(projectId: string, taskId: string):Promise<{ success: boolean; message: String; task?: any; }>{
        this.database = await Database.getInstance('dbName');
        try {
            const project = await Project.findById(projectId);
            if (!project) {
                return { success: false, message: 'Project not found' };
            }
            const task = project.tasks.find((task: any) => task._id.toString() === taskId);
            if (!task) {
                return { success: false, message: 'Task not found' };
            }
            return { success: true, message: 'Task retrieved successfully', task };
        }
        catch(err){
            return { success: false, message: 'An error occurred during get by id task' };
            console.error("An error occured during the getByIdTask", err);
        }
        finally{
            this.database.close();
        }
    }



}