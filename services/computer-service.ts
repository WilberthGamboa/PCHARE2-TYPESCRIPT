import computerModel, { Computer } from "../models/computer-model";


class ComputerService{
    constructor(){
        
    }

    public async getComputers(limite:number,desde:number,busqueda:string):Promise<Computer[]>{
        const regex = new RegExp(busqueda.toString());
  
        const myComputers = await computerModel.find({
        
        nombre:regex

      })
      .skip( Number( Number(desde)*5 ))
      .limit(Number( limite ))   

      return myComputers;
    }

    public async getMyComputers(limite:number,desde:number,busqueda:string,idUser:string):Promise<Computer[]>{
        const regex = new RegExp(busqueda.toString(), 'i');
  
        const myComputers = await computerModel.find({
          user: idUser,
          nombre:regex
        })
        .skip( Number( desde ))
        .limit(Number( limite ))

        return myComputers;
    }

    public async getMyImgComputer(idUser:string,idComputer:string){
      const myComputerImg = await computerModel.findOne({
        user: idUser,
        _id:idComputer
      });
      return myComputerImg;
    }


    public async getMyComputer(limite:number,desde:number,busqueda:string,idUser:string):Promise<Computer[]>{
      const regex = new RegExp(busqueda.toString(), 'i');

      const myComputers = await computerModel.find({
        user: idUser,
        nombre:regex
      })
      .skip( Number( desde ))
      .limit(Number( limite ))

      return myComputers;
  }

  public async getMyComputerByName(limite:number,desde:number,idUser:string,nameComputer:String){
  
      const myComputer = await computerModel.findOne({ 
        
        user: idUser,
        nombre:nameComputer
      
      
      
      }) // filtra las publicaciones por el id del usuario
      .populate('user') // reemplaza la propiedad `user` por los datos completos del usuario
      .skip( Number( desde ))
      .limit(Number( limite ))

      return myComputer;
  }

   



}

export default ComputerService;