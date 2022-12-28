import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction } from "express";
import { Request,Response } from "express";

export const validarJWT = (req:Request,res:Response,next:NextFunction)  =>{
    
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg:'Token no encontrado'
        })
    }

    try {
        const {id} = jwt.verify(token,(process.env.secretOrPrivateKey||'')) as JwtPayload;
             req.id = id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"No se puede procesar, token no valido"
        })
    }


}