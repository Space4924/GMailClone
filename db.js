import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();
const url=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gmail-clone.ziwwai1.mongodb.net/?retryWrites=true&w=majority&appName=GMail-Clone`
const Connection=async()=>{
    try{
           const connection=await mongoose.connect(url,{
            useNewUrlParser:true
           });
           console.log("Database Conencted Succesfully");
    }catch(err){
        console.log("Error while Connecting the Database",err.message);
    }
}
export default Connection;