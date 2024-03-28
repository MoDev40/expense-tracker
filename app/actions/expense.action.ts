'use server';

import { ExpenseBody } from "@/types/types";
import ExpenseModel from "../models/ExpenseModel";
import connectDB from "../config/connectDB";


export async function createExpense(data:ExpenseBody) : Promise<void>{
    connectDB()
    const newExpense = {
        amount: data.amount,
        user:data.user,
        tag:data.tag_id   
    }
    const createdExp = new ExpenseModel(newExpense)
    createdExp.save();
}

export async function deleteMyExpense(id:string) : Promise<void> {
    connectDB()
    await ExpenseModel.findByIdAndDelete({_id:id})

}

export async function updateMyExpense({expense_id,data}:{expense_id:string,data:ExpenseBody}) : Promise<void> {
    connectDB();
    await ExpenseModel.findByIdAndUpdate({_id:expense_id},{$set:{
        amount:data.amount,
        tag:data.tag_id,
    }})
}