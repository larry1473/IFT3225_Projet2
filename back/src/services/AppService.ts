import { User } from "../models/user";
import Database from "./Database";
import validator from 'validator';
import zxcvbn from 'zxcvbn';
import AuthServices from "./AuthService";
import { TaskModel,Task } from "../models/Task";
import { Schema } from "mongoose";
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
                const user = new User({name,email,password});
                await user.save();
                return {success:true, message:"User signed up successfully"};

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

    public async addTask(task:any):Promise<{success:boolean; message:String}>{
        this.database = await Database.getInstance('dbName');
        try {
           
            await task.save();
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



}