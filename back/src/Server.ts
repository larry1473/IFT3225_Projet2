import 'dotenv/config';
import express, { Application } from "express";
import { appRoutes, AppRoutes} from "./routes/AppRoutes";
import cors from 'cors'; 

export class Server {

    private _app: Application;
    private _appRoutes: AppRoutes;

    constructor() {
        this._app = express();
        this._appRoutes = appRoutes;
        this.init();
    }

    public start() {
        this._app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    }

    public get app(){
        return this._app;
    }

    public get appRoutes(){
        return this._appRoutes;
    }

    public root(): void {
        this._app.get('/', (req, res) => {
            res.status(200).send("Hello");
        });
    }

    public linkRoutes(): void {
        this._app.use('/api/v1', this._appRoutes.routes)
        
    }

    private init(): void {
      
        const corsOptions ={
            origin:'http://localhost:5000', 
            credentials:true,            //access-control-allow-credentials:true
            optionSuccessStatus:200
        }
        this._app.use(cors(corsOptions));
        this._app.use(express.json());
        this.root();
        this.linkRoutes();
    }


}




