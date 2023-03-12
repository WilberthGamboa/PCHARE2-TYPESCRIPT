import bcryptjs from "bcryptjs";
import userModel, { User } from "../models/user-model";

class AuthService {
    public async getUser(email:String):Promise<User|null>{
        const usuario = await userModel.findOne({ email });
        return usuario;
    }

    public isPasswordValid(reqPassword:string,dbPassword:string):boolean{
        const validation  = bcryptjs.compareSync( reqPassword, dbPassword );
        return validation;
    }

    public hashPassword(reqPassword:string):string{
        console.log("dentro de hash");
        const salt =  bcryptjs.genSaltSync(10);
        console.log(salt);
        const hashedPassword = bcryptjs.hashSync(reqPassword,salt);
        
        return hashedPassword;
    }

    public  saveUser(user:User):Promise<User|null>{
       const userSaved =  user.save();
        return userSaved;
    }
}

export default AuthService;



