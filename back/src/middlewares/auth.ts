import { Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";



const auth = (req:Request, res:Response,next:NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ','');

    if(!token ){
        return res.status(401).send('Access Denied. No token provided.');
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(400).send('Invalid Token');
    }
}
export default auth;
