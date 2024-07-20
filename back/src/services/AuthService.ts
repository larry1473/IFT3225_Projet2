import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';

 class AuthService{
    /**
     * this function is used to generate a token for a user
     * @param user the user object 
     * @returns 
     */
    public static generateToken(user: any):string{
        const token:string  = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET as string , {
            expiresIn: '24h' // Token expires in 24 hour
        });
        return token;
        
    }

    public static async signIn(email: string, password: string): Promise< {token?:string, response:string , userName?:string} >{
        const user = await User.findOne({ email: email});

        if(!user){
            throw new Error('Invalid email or password');
        }
        if(await bcrypt.compare(password, user.password)){
            const token = this.generateToken(user);
            return {token: token, response: 'success', userName: user.name};

        }
        return {response: 'Invalid email or password'};
        
    }




}
export default AuthService;