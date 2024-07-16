import jwt from 'jsonwebtoken';
import { User } from '../models/user';

 class AuthService{
    /**
     * this function is used to generate a token for a user
     * @param user the user object 
     * @returns 
     */
    public static generateToken(user: any):string{
        const token:string  = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET as string , {
            expiresIn: '1h' // Token expires in 1 hour
        });
        return token;
        
    }

    public static async signIn(email: string, password: string): Promise<string>{
        const user = await User.findOne({ email: email , password: password});

        if(!user){
            throw new Error('Invalid email or password');
        }
        const token = this.generateToken(user);
        return token;
    }




}
export default AuthService;