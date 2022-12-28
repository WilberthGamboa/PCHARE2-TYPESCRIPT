import { Request,Response } from "express";
import User from '../models/user-model';
import bcryptjs from "bcryptjs";
import Jwt from "../helpers/jwt";
export const authLogin = async (req:Request,res:Response) =>{
   const {email,password}= req.body;

   try {
      
    // Verificar si el email existe
    const usuario = await User.findOne({ email });
    if ( !usuario ) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
        });
    }

   

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync( password, usuario.password );
    if ( !validPassword ) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - password'
        });
    }

    // Generar el JWT
    const token = await Jwt.generarJWT( usuario.id);

    res.json({
        usuario,
        token
    })

} catch (error) {
    console.log(error)
    res.status(500).json({
        msg: 'Hable con el administrador'
    });
}   


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