import { Router, Request,Response } from "express";
import { AppService } from "../services/AppService";
import authMiddleware from '../middlewares/auth';
import { Task, TaskModel } from "../models/Task";


class AppRoutes{

    private _routes:Router;
    private appService:AppService;
    

    constructor(){
        this._routes = Router();    
        this.appService = new AppService();
        this.init();
    }
    /**
     * this function is used to sign up a user
     * call the service method signUp to sign up a user
     * @param req 
     * @param res 
     */
    public async signUp(req:Request,res:Response){
        try{
            const {name,email,password} = req.body;
            const result = await this.appService.signUp(name,email,password);
            if(result.success){
                res.status(201).send({ // created successfully
                    message:result.message
                });
            }
            else if(result.message === "This email already exists"){
                res.status(409).send({ // conflict during sign up
                    message:result.message
                });
            }
            else if(result.message === "Invalid email format" || result.message === "Password is too weak"){
                res.status(400).send({ // bad request
                    message:result.message
                });
            }
            else{
                res.status(500).send({
                    message:result.message
                });
            }
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async signIn(req:Request,res:Response){
        try{
            const {email,password} = req.body;
            const result = await this.appService.signIn(email,password);
            if(result.success){
                res.status(200).send({
                    message:result.message,
                    token:result.token
                });
            }
            else if(result.message === "This email does not exist"){
                res.status(500).send({
                    message:result.message
                });
            }
            else if(result.message === "Wrong password"){
                res.status(500).send({
                    message:result.message
                });
            }
            else{
                res.status(500).send({
                    message:result.message
                });
            }
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public  signInGet(req:Request,res:Response){
        try{
            res.status(200).send("welcome to the sign in page");
        }
        catch(err){

            res.status(500).send("Internal Server Error");
        }

    }

    public  signUpGet(req:Request,res:Response){
        try{
            res.status(200).send("welcome to the sign up page");
        }
        catch(err){

            res.status(500).send("Internal Server Error");
        }

    }
    public async logout(req:Request,res:Response){
        try{
            res.status(200).send("You have been logged out");

        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async addTask(req:Request,res:Response){
        console.log("in add task");
        console.log(req.body);
        try{
            const taskSchema = new Task(req.body);
            const result = await this.appService.addTask(taskSchema);
            res.status(200).send({
                message:result.message
            });
           
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public get routes():Router{
        return this._routes;
    }



    private init():void{
        this._routes.post('/signup',this.signUp.bind(this));
        this._routes.post('/signin',this.signIn.bind(this));
        this._routes.get('/signin',this.signInGet.bind(this));
        this._routes.get('/signup',this.signUpGet.bind(this));
        this.routes.get('/logout',authMiddleware,this.logout.bind(this));
        this._routes.post('/tasks',authMiddleware,this.addTask.bind(this));
    }

    
}
const appRoutes:AppRoutes = new AppRoutes();
export {appRoutes,AppRoutes};