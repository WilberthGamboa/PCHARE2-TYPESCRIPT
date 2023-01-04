

import bcryptjs from "bcryptjs";
import userModel, { User } from "../models/user-model";

class AuthService {
    public async getUser(email:String){
        const usuario = await userModel.findOne({ email });
        return usuario;
    }

    public isPasswordValid(reqPassword:string,dbPassword:string){
        const validation  = bcryptjs.compareSync( reqPassword, dbPassword );
        return validation;
    }

    public hashPassword(reqPassword:string){
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(reqPassword,salt);
        return hashedPassword;
    }

    public async saveUser(user:User){
       const userSaved = await user.save();
        return userSaved;
    }
}

export default AuthService;
