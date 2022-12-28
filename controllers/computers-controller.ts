
import { Request,Response } from "express"
import Computers from "../models/computer-model"
export const postComputer = async(req:Request,res:Response)  =>{
    const {
        nombre,
        procesador,
        tarjetaDeVideo,
        tarjetaMadre,
        gabinete,
        almacenamiento,
      } = req.body;
     

      const computer = new Computers({nombre,procesador,tarjetaDeVideo,tarjetaMadre,gabinete,almacenamiento});
    await computer.save();
    res.json({
        computer
    })

}
