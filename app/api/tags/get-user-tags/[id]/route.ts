import TagModel from "@/app/models/TagModel";
import UserModel from "@/app/models/UserModel";
import {NextRequest,NextResponse} from "next/server"

type Params = {
    id:string;
}
export  async function GET(req:NextRequest,{params}:{params:Params}) {
  try {
    const {id} = params
    const user = await UserModel.findOne({email:id})
    if(!user){
      return NextResponse.json({message:"unAuthorized User"},{status:200})
    }
    const tags = await TagModel.find({user:user?._id})
    return NextResponse.json({tags},{status:200})
  } catch (error:any) {
    return NextResponse.json({error},{status:500})
  }
}