import { Schema, model} from "mongoose";

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
    }

})
//ComputerSchema.index({ username: 1 }, { unique: true, partialFilterExpression: { company: companyId } });

/*
 usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
*/

ComputerSchema.methods.toJSON = function () {
    const { __v, ...data  } = this.toObject();
    return data;
}
export default model('Computers',ComputerSchema);