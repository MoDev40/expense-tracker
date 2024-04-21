import { z } from "zod";

export interface TagInterface {
    _id: string;
    name: string;
    tag: string;
    user:string;
    is_public: boolean;
}

export interface ExpenseBody {
    amount: number;
    user: string;
    tag_id: string;
}

export interface TagBody{
    user_id:string;
    name:string;
    tag:string;
}

export interface SummaryResponseInterface {
    highestExpense:InterfaceExpense;
    lowestExpense:InterfaceExpense;
    sumMonthExpenses:number;
    expenses:InterfaceExpense[];
}
export interface InterfaceExpense  {
    _id: string;
    amount: number;
    user: string;
    createdAt:Date;
    updatedAt:Date;
    tag:{
        _id:string;
        tag:string;
        name:string;
    }
}

export const expenseSchema = z.object({
    price:z.string().min(0.01,"at least one cent"),
    tag:z.string().min(1,"tag icon is required"),
})

export const tagSchema = z.object({
    name:z.string().min(2,"tag name is required"),
    tag:z.string().min(1,"tag icon is required").max(2,"max 1 tag icon"),
})
export type ExpInputs = z.infer<typeof expenseSchema>

export type TagInputs = z.infer<typeof tagSchema> 

