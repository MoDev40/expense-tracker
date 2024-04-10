import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/app/config/connectDB";
import { TagBody } from "@/types/types";
import TagModel from "@/app/models/TagModel";


type Params = {
    _id: string;
}
export async function PUT(req: NextRequest, { params }: { params:Params }){
    try {
        connectDB()

        const {tag,name} : TagBody = await req.json();

        const isTagExists = await TagModel.find({
            $and:[
                {name},
                {tag}
            ]
        })

        if(isTagExists.length>0){
            return NextResponse.json({message:"Tag already exists"},{status:400})
        }

        const updatedTag = await TagModel.findByIdAndUpdate({_id:params._id},{$set:{
            name,
            tag,
        }});
        
        if(!updatedTag){
            return NextResponse.json({message:"unexpected error occurred"},{status:400})
        }

        return NextResponse.json({message:"Tag updated successfully"},{status:200})

    } catch (error:any) {
        return NextResponse.json({message: error.message || "Server error occurred"},{status:500})
    }
}