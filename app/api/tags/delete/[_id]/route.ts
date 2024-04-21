import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/app/config/connectDB";
import TagModel from "@/lib/models/TagModel";
import ExpenseModel from "@/lib/models/ExpenseModel";

type Params = {
    _id: string;
}
export async function DELETE(req: NextRequest, { params }: { params:Params }){
    try {
        connectDB()

        const {_id} = params;

        const expenseRelatedTag = await ExpenseModel.find({tag:_id})
        if(expenseRelatedTag.length > 0){
            return NextResponse.json({message:"Tag is used in expenses"},{status:400})
        }
        
        const deletedTag = await TagModel.findByIdAndDelete({_id})

        if(!deletedTag){
            return NextResponse.json({message:"unexpected error occurred"},{status:400})
        }
        
        return NextResponse.json({message:"Tag deleted successfully"},{status:200})

    } catch (error:any) {
        return NextResponse.json({message: error.message || "Server error occurred"},{status:500})
    }
}