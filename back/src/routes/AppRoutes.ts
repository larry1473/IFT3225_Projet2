import { Router, Request,Response } from "express";
import { AppService } from "../services/AppService";
import authMiddleware from '../middlewares/auth';
import { Task, TaskModel } from "../models/Task";
import { Project } from "../models/project";


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
                    token:result.token,
                    username: result.userName
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
        try{
            const taskSchema = new Task(req.body);
            const result = await this.appService.addTask(taskSchema,req.params.id);
            res.status(200).send({
                message:result.message,
                project:result.project
            });
           
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async addProject(req:Request,res:Response){
        try {
            const projectSchema = new Project(req.body);
            const result = await this.appService.addProject(projectSchema);
            res.status(200).send({
                message:result.message
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async getProjects(req:Request,res:Response){
        try{
            const result = await this.appService.getProjects();

            res.status(200).send({
                message:result.message,
                projects:result.projects
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async deleteProject(req:Request,res:Response){
        console.log("in delete project");
        try{
            const id = req.params.id;
            const result = await this.appService.deleteProject(id);
            res.status(200).send({
                message:result.message
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async getTasks(req:Request,res:Response){
        try{
            const id = req.params.id;
            const result = await this.appService.getTask(id);
            res.status(200).send({
                message:result.message,
                tasks:result.tasks
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error ");
        }
    }

    public async deleteTask(req:Request,res:Response){
        try{
            const {projectId, taskId} = req.params;
           
            const result = await this.appService.deleteTask(projectId,taskId);
            res.status(200).send({
                message:result.message
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async getByIdTask(req:Request,res:Response){
        try{
            const {projectId, taskId} = req.params;
            const result = await this.appService.getByIdTask(projectId,taskId);
            res.status(200).send({
                message:result.message,
                task:result.task
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }
    public async getGuests(req:Request,res:Response){
        try{
            const id = req.params.id;
            const result = await this.appService.getGuests(id);
            res.status(200).send({
                message:result.message,
                guests:result.guests
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async addGuest(req:Request,res:Response){
        try{
            const id = req.params.id;
            const guestName =req.body.guestName;
            const result = await this.appService.addGuest(id,guestName);
            res.status(200).send({
                message:result.message
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async deleteGuest(req:Request,res:Response){
        try{
            const {projectId,guestName} = req.params;
            const result = await this.appService.deleteGuest(projectId,guestName);
            res.status(200).send({
                message:result.message
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async getTaskGuests(req:Request,res:Response){
        try{
            const {projectId,taskId} = req.params;
            const result = await this.appService.getTaskGuests(projectId,taskId);
            res.status(200).send({
                message:result.message,
                guests:result.task
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async addTaskGuests(req:Request,res:Response){
        try{
            const {projectId,taskId} = req.params;
            const guestName = req.body.guestName;
            const result = await this.appService.addTaskGuests(projectId,taskId,guestName);
            res.status(200).send({
                message:result.message
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }
    public async deleteTaskGuest(req:Request,res:Response){
        try{
            const {projectId,taskId,guestName} = req.params;
            const result = await this.appService.deleteTaskGuest(projectId,taskId,guestName);
            res.status(200).send({
                message:result.message
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async getRequester(req:Request,res:Response){
        try{
            const {projectId} = req.params;
            const result = await this.appService.getRequester(projectId);
            res.status(200).send({
                message:result.message,
                requesters:result.requester
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async addRequester(req:Request,res:Response){
        try{
            const {projectId} = req.params;
            const requesterName = req.body.requesterName;
            const result = await this.appService.addRequester(projectId,requesterName);
            res.status(200).send({
                message:result.message
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async deleteRequester(req:Request,res:Response){
        try{
            const {projectId,requesterName} = req.params;
            const result = await this.appService.deleteRequester(projectId,requesterName);
            res.status(200).send({
                message:result.message
            });
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public async changeDate(req:Request,res:Response){
        try{
            const {projectId,taskId} = req.params;
            const date = req.body.endDate;
            const result = await this.appService.changeDate(projectId,taskId,date);
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
        //project endpoints
        this._routes.post('/projects',authMiddleware,this.addProject.bind(this));
        this._routes.get('/projects',this.getProjects.bind(this));
        this._routes.delete('/projects/:id',authMiddleware,this.deleteProject.bind(this));
        // project tasks endpoints
        this._routes.get('/projects/:id/tasks',authMiddleware,this.getTasks.bind(this));
        this._routes.post('/projects/:id',authMiddleware,this.addTask.bind(this));
        this._routes.delete('/projects/:projectId/tasks/:taskId',authMiddleware,this.deleteTask.bind(this));
        this._routes.get('/projects/:projectId/tasks/:taskId',authMiddleware,this.getByIdTask.bind(this));
        // project guests endpoints
        this.routes.get('/projects/:id/guests',authMiddleware,this.getGuests.bind(this));
        this._routes.post('/projects/:id/guests',authMiddleware,this.addGuest.bind(this));
        this._routes.delete('/projects/:projectId/guests/:guestName',authMiddleware,this.deleteGuest.bind(this));
        
        // project tasks guest endpoints
        this._routes.get('/projects/:projectId/tasks/:taskId/guests',authMiddleware,this.getTaskGuests.bind(this));
        this._routes.post('/projects/:projectId/tasks/:taskId/guests',authMiddleware,this.addTaskGuests.bind(this));
        this._routes.delete('/projects/:projectId/tasks/:taskId/guests/:guestName',authMiddleware,this.deleteTaskGuest.bind(this));
        this._routes.post('/projects/:projectId/tasks/:taskId',authMiddleware,this.changeDate.bind(this));

        // project requesters endpoints
        this._routes.get('/projects/:projectId/requesters',authMiddleware,this.getRequester.bind(this));
        this._routes.post('/projects/:projectId/requesters',authMiddleware,this.addRequester.bind(this));
        this._routes.delete('/projects/:projectId/requesters/:requesterName',authMiddleware,this.deleteRequester.bind(this));
        

    }

    
}
const appRoutes:AppRoutes = new AppRoutes();
export {appRoutes,AppRoutes};