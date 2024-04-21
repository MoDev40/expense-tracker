import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/app/config/connectDB";
import ExpenseModel from "@/lib/models/ExpenseModel";

type Params = {
    _id: string;
}
export async function DELETE(req: NextRequest, { params }: { params:Params }){
    try {
        connectDB()

        const {_id} = params;
        
        const deletedExp = await ExpenseModel.findByIdAndDelete({_id})
        if(!deletedExp){
            return NextResponse.json({message:"unexpected error occurred"},{status:400})
        }
        
        return NextResponse.json({message:"Expense deleted successfully"},{status:200})
    } catch (error:any) {
        return NextResponse.json({message: error.message || "Server error occurred"},{status:500})
    }
}