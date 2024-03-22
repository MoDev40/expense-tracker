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
        
    }
    
}