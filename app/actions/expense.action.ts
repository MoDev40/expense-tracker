'use server';

import { ExpenseBody } from "@/types/types";
import ExpenseModel from "../models/ExpenseModel";
import connectDB from "../config/connectDB";


export async function createExpense(data:ExpenseBody) : Promise<void>{
    try {
        connectDB()
        const newExpense = {
            amount: data.amount,
            user:data.user,
            tag:data.tag_id   
        }
        const createdExp = new ExpenseModel(newExpense)
        createdExp.save();
    } catch (error) {
        console.log(error);
    }
    
}

export async function deleteMyExpense(id:string) : Promise<void> {
    try {
        connectDB()
        await ExpenseModel.findByIdAndDelete({_id:id})
    } catch (error) {
        console.log(error);
    }
}

export async function updateMyExpense({expense_id,data}:{expense_id:string,data:ExpenseBody}) : Promise<void> {
    try {
        connectDB();
        await ExpenseModel.findByIdAndUpdate({_id:expense_id},{$set:{
            amount:data.amount,
            tag:data.tag_id,
        }})
    } catch (error) {
        console.log(error);
    }
}