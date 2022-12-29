
import { Request,Response } from "express"

import { subirArchivo } from "../helpers/subir-archivos";
import Computers from "../models/computer-model"

export const getMyComputers = async(req:Request,res:Response) =>{
  const { limite = 5, desde = 0 } = req.query;
  
  const myComputers = await Computers.find({
    
    user: req.id
  })
  res.json({
    myComputers
  })


}

export const postComputer = async(req:Request,res:Response)  =>{

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json("No se ha subido ningún archivo");
        return;
      }
      if (!req.files.archivo) {
        res.status(400).json("No se ha subido ningún archivo");
        return;
      }
   
      
      if (Array.isArray(req.files.archivo) || Object.keys(req.files).length>1 ) {
        res.status(400).json("Máximo un archivo");
        return;
      }
    
    const {
        nombre,
        procesador,
        tarjetaDeVideo,
        tarjetaMadre,
        gabinete,
        almacenamiento,
      } = req.body;
      console.log(req.id)
      
      const x = await Computers.findOne({ 
        
        user: req.id,
        nombre:nombre
      
      
      
      }) // filtra las publicaciones por el id del usuario
      .populate('user') // reemplaza la propiedad `user` por los datos completos del usuario
     
      if (x) {
       return res.status(400).json({
          msg:"ya existe"
        })
        
      }
  
      
      
     
      const urlFoto = await subirArchivo( req.files);
      const user = req.id
      const computer = new Computers({nombre,procesador,tarjetaDeVideo,tarjetaMadre,gabinete,almacenamiento,urlFoto,user});
      await computer.save();
    res.json({
        computer,
       
    })

}
