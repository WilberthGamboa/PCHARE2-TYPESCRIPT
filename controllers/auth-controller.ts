import { Request,Response } from "express";
import User from '../models/user-model';
import Jwt from "../helpers/jwt";
import AuthService from "../services/auth-service";


class AuthController {
    private authService:AuthService;
    constructor() {
         this.authService= new AuthService();
       
    }
     public  authLogin = async (req:Request,res:Response)=>{
        const {email,password}= req.body;
        try {
           
            
         // Verificar si el email existe
        const usuario = await this.authService.getUser(email);
       
        if ( !usuario ) {
             return res.status(400).json({
                 msg: 'Usuario / Password no son correctos - correo'
             });
         }
     
        const validPassword = this.authService.isPasswordValid(password,usuario.password);
         
         if ( !validPassword ) {
             return res.status(400).json({
                 msg: 'Correo / Contraseña no son correctos'
             });
         }
     
       
         const token = await Jwt.generarJWT(usuario.id);
         
        // const userSinPassword = delete usuario.password;
         
        if (usuario.password) 
        {
            const {password,...userData} = usuario.toJSON();
            res.json({
                userData,
                token
            })
        }
        
         
        
     
     } catch (error) {
         console.log(error)
         res.status(500).json({
             msg: 'Error hable con backend'
         });
     }   
     
     
     }
     public  authRegister = async(req:Request,res:Response)=> {
        const {name,lastname,username,password,email,age}  = req.body;
        const user = new User({name,lastname,username,password,email,age});
       
      
        try {
            user.password = this.authService.hashPassword(password);
            const userData = await this.authService.saveUser(user);
            res.json({
                userData
            })
        } catch (error) {

            console.log(error)
            res.status(500).json({
                msg: 'Error hable con backend'
            });
            
        }
    }

      
}

export default AuthController;

/*

export const authLogin = async (req:Request,res:Response) =>{
   const {email,password}= req.body;

   try {
      
    // Verificar si el email existe
   // const usuario = await User.findOne({ email });
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
*/