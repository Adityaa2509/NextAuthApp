import mongoose from "mongoose";


export async function connectDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI!)
        const connection =  mongoose.connection

        connection.on('connected',()=>{
            console.log("Mongodb connected")
        })
        connection.on('error',(err)=>{
            console.log('Mongodb connection error! please make sure db is up and running')
            console.log(err);
            process.exit()
        })
    }catch(err){
        console.log(err);
        console.log("Something went wrong");
    }
}