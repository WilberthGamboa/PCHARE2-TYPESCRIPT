import { Request,Response } from "express";
import User from '../models/user-model';
import bcryptjs from "bcryptjs";
export const authLogin = (req:Request,res:Response) =>{

}

export const authRegister = async (req:Request,res:Response) =>{
    const {name,lastname,username,password,email,age}  = req.body;

    const user = new User({name,lastname,username,password,email,age});

    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password,salt);
    await user.save();
    res.json({
        user
    })
}