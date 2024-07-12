import { Router, Request,Response } from "express";
import { AppService } from "../services/appService";


class AppRoutes{

    private _routes:Router;
    private appService:AppService;
    

    constructor(){
        this._routes = Router();    
        this.appService = new AppService();
        this.init();
    }

    public async signin(req:Request,res:Response){
        try{
            const {email,password} = req.body;
            this.appService.signin(email,password);
            res.status(200).send("Hello World!") ; 
        }
        catch(err){
            res.status(500).send("Internal Server Error");
        }
    }

    public get routes():Router{
        return this._routes;
    }



    private init():void{
        this._routes.post('/signin',this.signin.bind(this));
    }

    
}
const appRoutes:AppRoutes = new AppRoutes();
export {appRoutes,AppRoutes};