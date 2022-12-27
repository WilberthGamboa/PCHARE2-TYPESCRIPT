import express from 'express'
import cors from "cors";
import dbConnection from '../database/config';
class Server {
    private app: express.Application;
    private port:string;
    private paths={
        auth:'/PcShare/auth',
        computer:'/PcShare/computer'
    };
    constructor() {
        this.app=express();
        this.port = process.env.PORT || '3000';

        this.middlewares();
        this.conectarDB();
        
        
    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
          //CORS
       this.app.use(cors());
       //lectura y parseo

       this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("servidor arriba");
        })
    }
    routes(){
        // this.app.use(this.usuariosPath,require('../routes/user'));
     this.app.use(this.paths.auth,require('../routes/auth-router'));
     //this.app.use(this.paths.computer,require('../routes/computer-router'));
 
     }
}

export default Server;

