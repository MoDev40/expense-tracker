import mongoose from "mongoose";
const uri = process.env.DATABASE_URL!
export default async function connectDB(){
    try {
        await mongoose.connect(uri).then(()=>{
            console.log("connected");
        }).catch((error:any)=>{
            console.log("not connected",error);
        })
    } catch (error) {
        console.log(error);
    }
}

