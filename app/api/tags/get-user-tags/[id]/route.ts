import TagModel from "@/app/models/TagModel";
import {NextRequest,NextResponse} from "next/server"

type Params = {
    id:string;
}
export  async function GET(req:NextRequest,{params}:{params:Params}) {
  try {
    const {id} = params
    const tags = await TagModel.find({user:id})
    return NextResponse.json({tags},{status:200})
  } catch (error:any) {
    return NextResponse.json({error},{status:500})
  }
}