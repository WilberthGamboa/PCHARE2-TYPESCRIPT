import fs from 'fs';
import path from 'path';
import { Request,Response } from "express"
import { subirArchivo } from "../helpers/subir-archivos";
import Computers from "../models/computer-model"
import ComputerService from '../services/computer-service';


class ComputerController{
  private computerService = new ComputerService();
  constructor(){
    
  }
  public async getComputers (req:Request,res:Response){
    const { limite = 5, desde = 0, busqueda='' } = req.query;
    if (isNaN(Number(limite))|| isNaN(Number(desde))) {
      res.status(401).json({
        "msg":"Req query params invalid"
      });
    }
   try {
    const computers = await this.computerService.getComputers(Number(limite),Number(desde),busqueda.toString());
    res.json({
      computers
    })
   } catch (error) {
    console.log(error);
    res.status(500).json({
      "msg":"Llame al de backend"
    })
   }

  }

  public async getMyComputers(req:Request,res:Response){
    const { limite = 5, desde = 0, busqueda=''} = req.query;
    if (isNaN(Number(limite))|| isNaN(Number(desde))) {
      res.status(401).json({
        "msg":"Req query params invalid"
      });
    }
   try {
    const myComputers = await this.computerService.getMyComputers(Number(limite),Number(desde),busqueda.toString(),req.id);
    res.json({
      myComputers
    });
   } catch (error) {
    
   }

  }

  public async getMyImgComputer(req:Request,res:Response){
    const { id } = req.params;

    try {
      const myImgComputer = await this.computerService.getMyImgComputer(req.id,id);
    
      if (!myImgComputer) {
        return res.status(404).json({
          msg: "No existe pc con el id " + id,
        });
      }
    
      if (myImgComputer.urlFoto===undefined) {
        
      }else{
        const pathFoto = path.join(__dirname,'../uploads/',myImgComputer.urlFoto)
        res.download(pathFoto);
      }
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        "msg":"Error llamen al backend"
      })
      
    }

   

  }

  public async postComputer(req:Request,res:Response){
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
    
      const { limite = 5, desde = 0 } = req.query;
      const {
        nombre,
        procesador,
        tarjetaDeVideo,
        tarjetaMadre,
        gabinete,
        almacenamiento,
      } = req.body;

      try {
        
      const computerExist = await this.computerService.getMyComputerByName(Number(limite),Number(desde),req.id,nombre);
      if (computerExist) {
       return res.status(400).json({
          msg:"ya existe"
        }) 
      }
      

     
      const computerSaved = this.computerService.saveMyComputer(req.body,req.files,req.id)
      //
     // const computer = new Computers({nombre,procesador,tarjetaDeVideo,tarjetaMadre,gabinete,almacenamiento,urlFoto,user});
     // await computer.save();
    res.json({
      computerSaved
       
    })
        
      } catch (error) {
        console.log(error);
        res.status(500).json({
          "msg":"Error llamen al backend"
        })
        
        
      }


  }

  public async updateComputer(req:Request,res:Response){
    const {id} = req.params;

    try {

      const computerExist = await this.computerService.findOneComputer(id,req.id)
      const {user,...data} = req.body;

  if (!computerExist) {
    res.status(400).json({
      msg:"No existe la computadora"
    })
    return
  }
  
  if (!req.files || Object.keys(req.files).length === 0) {
    
   const myComputers = await Computers.findByIdAndUpdate(id,data,{new:true});
    return res.json({
      myComputers
    })
  }else{
    if (Array.isArray(req.files.archivo) || Object.keys(req.files).length>1) {
      
      res.status(400).json("No se puede subir mas de un archivo");
      return;
    }else{
   
      if (computerExist.urlFoto) {
        const pathImagen = path.join(__dirname,'../uploads/',computerExist.urlFoto);
        console.log(pathImagen)
         if (fs.existsSync(pathImagen)) {
          console.log(pathImagen)
            fs.unlinkSync(pathImagen);
          
         }
        
      }
  
      const urlFoto = await subirArchivo(req.files);
      data.urlFoto=urlFoto
  
     // const consultaBody = req.body;
     //const urlFotoObj = {urlFoto};
     
     const myComputers = await Computers.findByIdAndUpdate(id,data,{new:true});
      res.json({
        myComputers
      })
    }
    
  }
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        "msg":"Error llamen al backend"
      })
      
    }
  

  }

  public async deleteComputer(req:Request,res:Response){
    const {id} = req.params;
    try {
      const computerExist = await this.computerService.findOneComputer(id,req.id);
      if (!computerExist) {
        res.status(400).json({
          msg:"No existe la computadora"
        })
        return
      }
      const deleteComputer = await this.computerService.findByIdAndDeleteComputer(id);
      
  if (computerExist.urlFoto) {
    const pathImagen = path.join(__dirname,'../uploads/',computerExist.urlFoto);
    console.log(pathImagen)
     if (fs.existsSync(pathImagen)) {
      console.log(pathImagen)
        fs.unlinkSync(pathImagen);
      
     }
    
  }

  console.log(deleteComputer)
  res.json({

    deleteComputer
  })

    } catch (error) {
      
    }
 
 

  

  
  //const deleteComputer = await Computers.deleteOne({computerExist})


  }
}

export default ComputerController;





