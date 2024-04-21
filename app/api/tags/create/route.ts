import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/app/config/connectDB";
import { TagBody } from "@/types/types";
import TagModel from "@/lib/models/TagModel";

export async function POST(req: NextRequest){
    try {
        connectDB()
        
        const {name,tag,user_id} : TagBody = await req.json();

        const newTag = {
            tag,
            name,
            user:user_id
        }

        const isTagExists = await TagModel.find({
            $and:[
                {name},
                {tag},
                {user:user_id},
            ]
        })

        if(isTagExists.length>0){
            return NextResponse.json({message:"Tag already exists"},{status:400})
        }

        const createdTag = new TagModel(newTag);
        createdTag.save()


        if(!createdTag){
            return NextResponse.json({message:"unexpected error occurred"},{status:400})
        }
        
        return NextResponse.json({message:"Tag created successfully"},{status:201})

    } catch (error:any) {
        return NextResponse.json({message: error.message || "Server error occurred"},{status:500})
    }
}