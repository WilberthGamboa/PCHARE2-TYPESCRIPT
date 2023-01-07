import mongoose, { Schema, model} from "mongoose";


const ComputerSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre de la computadora es obligatorio'],
        unique:true
    },
    procesador:{
        type:String,
        required:[true,'El nombre del procesador es obligatorio'],
    },

    tarjetaDeVideo:{
        type:String,
        required:[true,'El nombre de la tarjeta de video es obligatorio'],
    },

    tarjetaMadre:{
        type:String,
        required:[true,'El nombre de la tarjeta madre es obligatorio'],
    },

    gabinete:{
        type:String,
        required:[true,'El nombre del gabinete es obligatorio'],
    },
    almacenamiento:{
        type:String,
        required:[true,'El almacenamiento es obligatorio'],
    },
    urlFoto:{
        type:String,
        required:[false],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})
export type Computer = mongoose.Document &{
    nombre:string,
    procesador:string,
    tarjetaDeVideo:string,
    tarjetaMadre:string,
    gabinete:string,
    almacenamiento:string,
    urlFoto:string,
    user:mongoose.Schema.Types.ObjectId
}
//ComputerSchema.index({ username: 1 }, { unique: true, partialFilterExpression: { company: companyId } });

/*
 usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
*/
ComputerSchema.index({ nombre: 1, user: 1 }, { unique: true });
ComputerSchema.methods.toJSON = function () {
    const { __v, ...data  } = this.toObject();
    return data;
}
const Computer = mongoose.model<Computer>('Computer', ComputerSchema);
export default Computer;
