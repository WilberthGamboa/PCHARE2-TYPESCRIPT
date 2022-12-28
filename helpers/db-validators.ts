import User from '../models/user-model';
class DbValidators{
    constructor(){

    }
    static emailExists = async(email:String):Promise<void>=>{
        const emailExists = await User.findOne({ email });
        if ( emailExists ) {
            throw new Error(`El correo: ${ emailExists.email }, ya está registrado`);
        }
    
    }
    static usernameExists = async(username:String) : Promise<void>=>{
        const usernameExists = await User.findOne({ username });
        if ( usernameExists ) {
            throw new Error(`El usuario: ${ usernameExists.username }, ya está registrado`);
        }
      

}
 

 
    
}

export default DbValidators