import { model, Schema } from "mongoose";

const UsuarioSchema = new Schema({
    name:{
        type:String,
        required: [true,'nombre requerido'],
    },
   lastname:{
    type:String,
    required: [true,'Apellido requerido']
   },
   username:{
    type:String,
    required: [true,'user requerido'],
    unique:true
   },
   password:{
    type:String,
    required: [true,'contraseña requerido'],
   },
   email:{
    type:String,
    required: [true,'email requerido'],
    unique:true
   },
   age:{
    type:Number,
    required: [true,'Numero'],
   
   }
})
export default model('User');