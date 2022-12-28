import { validationResult } from "express-validator";
import { NextFunction } from "express";
import { Request,Response } from "express";
const validarCampos = (req:Request,res:Response, next:NextFunction) => {
    const errors = validationResult(req);
   // console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}   

export default validarCampos;