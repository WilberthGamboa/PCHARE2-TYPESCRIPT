
import { Request,Response } from "express"
import { subirArchivo } from "../helpers/subir-archivos";
import Computers from "../models/computer-model"

export const getComputers = async (req:Request,res:Response) =>{
  const { limite = 5, desde = 0, busqueda='' } = req.query;
    
const regex = new RegExp(busqueda.toString());

  
  const myComputers = await Computers.find({
    //nombre:'wilberth1'
    nombre:regex
    /*
    nombre:{
      $regex:busqueda
    }
    */
  })
  .skip( Number( Number(desde)*5 ))
  .limit(Number( limite ))

  res.json({
    myComputers
  })

}

export const getMyComputers = async(req:Request,res:Response) =>{
  const { limite = 5, desde = 0, busqueda=''} = req.query;
  const regex = new RegExp(busqueda.toString(), 'i');
  

  const myComputers = await Computers.find({
    user: req.id,
    nombre:regex
  })
  .skip( Number( desde ))
  .limit(Number( limite ))

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
      const { limite = 5, desde = 0 } = req.query;
      const x = await Computers.findOne({ 
        
        user: req.id,
        nombre:nombre
      
      
      
      }) // filtra las publicaciones por el id del usuario
      .populate('user') // reemplaza la propiedad `user` por los datos completos del usuario
      .skip( Number( desde ))
      .limit(Number( limite ))
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

export const updateComputer = async(req:Request,res:Response) => {
  const {id} = req.params;
  const computerExist = await Computers.findOne({ _id: id, user: req.id, });
  
  if (!computerExist) {
    res.status(400).json({
      msg:"No existe una computadora"
    })
    return
  }
  const {user,...data} = req.body;

  const myComputers = await Computers.findByIdAndUpdate(id,data,{new:true});


  return res.json({
    myComputers
    
  })
  console.log(myComputers)
}