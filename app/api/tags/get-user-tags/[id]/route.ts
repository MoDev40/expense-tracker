import connectDB from "@/app/config/connectDB";
import TagModel from "@/lib/models/TagModel";
import UserModel from "@/lib/models/UserModel";
import {NextRequest,NextResponse} from "next/server"

type Params = {
    id:string;
}
export  async function GET(req:NextRequest,{params}:{params:Params}) {
  try {
    const {id} = params
    connectDB()

    const user = await UserModel.findOne({email:id})
    if(!user){
      return NextResponse.json({message:"user not found"},{status:404})
    }
    const tags = await TagModel.find({user:user?._id})
    return NextResponse.json({tags},{status:200})
  } catch (error:any) {
    return NextResponse.json({error},{status:500})
  }
}