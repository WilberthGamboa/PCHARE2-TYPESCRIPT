import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const dbConnection = async () =>{
    try {
       await mongoose.connect(process.env.MONGODB_CNN ||'',{});
    } catch (error) {
        console.log(error)
        throw new Error('No se pudo levantar db')
    }
}

export default dbConnection;