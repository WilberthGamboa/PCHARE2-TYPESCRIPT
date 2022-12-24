import express from 'express'

class Server {
    private app: express.Application;
    private port:string;
    private path={
        auth:'/PcShare/auth',
        computer:'/PcShare/computer'
    };
    constructor() {
        this.app=express();
        this.port = process.env.PORT || '3000';

        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("servidor arriba")
        })
    }
}

export default Server;