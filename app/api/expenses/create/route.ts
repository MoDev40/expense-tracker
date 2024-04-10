import connectDB from "@/app/config/connectDB";
import ExpenseModel from "@/app/models/ExpenseModel";
import { ExpenseBody } from "@/types/types";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {

        connectDB()

        const {user,tag_id,amount} : ExpenseBody = await req.json();
        
        const newExpense = {
            amount,
            user,
            tag:tag_id   
        }
        
        const createdExp = new ExpenseModel(newExpense)
        createdExp.save()
        
        if(!createdExp){
            return NextResponse.json({message:"unexpected error occurred"},{status:400})
        }

        return NextResponse.json({message:"Expense created successfully"},{status:201})
        
    } catch (error:any) {
        return NextResponse.json({message: error.message || "Server error occurred"},{status:500})
    }
}