import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/app/config/connectDB";
import ExpenseModel from "@/lib/models/ExpenseModel";
import { ExpenseBody } from "@/types/types";

type Params = {
    _id: string;
}
export async function PUT(req: NextRequest, { params }: { params:Params }){
    try {
        connectDB()

        const {amount,tag_id} : ExpenseBody = await req.json();
        
        const updatedExp = await ExpenseModel.findByIdAndUpdate({_id:params._id},{$set:{
            amount,
            tag:tag_id,
        }});

        if(!updatedExp){
            return NextResponse.json({message:"unexpected error occurred"},{status:400})
        }
        
        return NextResponse.json({message:"Expense updated successfully"},{status:200})

    } catch (error:any) {
        return NextResponse.json({message: error.message || "Server error occurred"},{status:500})
    }
}