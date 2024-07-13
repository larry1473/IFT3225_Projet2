import { Router, Request,Response } from "express";
import { AppService } from "../services/AppService";


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
                    message:result.message
                });
            }
            else if(result.message === "This email does not exist"){
                res.status(404).send({
                    message:result.message
                });
            }
            else if(result.message === "Wrong password"){
                res.status(401).send({
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

    public get routes():Router{
        return this._routes;
    }



    private init():void{
        this._routes.post('/signup',this.signUp.bind(this));
        this._routes.post('/signin',this.signIn.bind(this));
    }

    
}
const appRoutes:AppRoutes = new AppRoutes();
export {appRoutes,AppRoutes};