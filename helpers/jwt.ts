import jwt from "jsonwebtoken";

class Jwt {
    constructor(){

    }
    static generarJWT = ( id :String ) => {

        return new Promise( (resolve, reject) => {
    
            const payload = { id };
     
            jwt.sign( payload, process.env.secretOrPrivateKey||'', {
                
            }, ( err, token ) => {
    
                if ( err ) {
                    console.log(err);
                    reject( 'No se pudo generar el token')
                } else {
                    resolve( token );
                }
            })
    
        })
    }

}

export default Jwt;

 

