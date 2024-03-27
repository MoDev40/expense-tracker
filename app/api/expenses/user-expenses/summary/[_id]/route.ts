import connectDB from '@/app/config/connectDB';
import ExpenseModel from '@/app/models/ExpenseModel';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  _id: string;
};

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { _id } = params;
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0)
  try {
    connectDB()
    const expenses = await ExpenseModel.find({
      $and:[
        {user: _id},
        {createdAt:{
          $gte:startDate,
          $lte:endDate
        }}
      ]
    }).populate('tag', 'name tag');

    const highestExpense = expenses.reduce((maxExpense,expense) =>{
      return expense.amount > maxExpense.amount ? expense : maxExpense;
    },expenses[0])

    const lowestExpense = expenses.reduce((minExpense,expense) =>{
      return expense.amount < minExpense.amount ? expense : minExpense;
    },expenses[0])

    const sumMonthExpenses = expenses.reduce((sum, expense) => {
      return sum += expense.amount;
    }, 0);
    
  return NextResponse.json({highestExpense,lowestExpense,sumMonthExpenses,expenses}, { status: 200 });

  } catch (error:any) {
    return NextResponse.json({ error, message:error.message}, { status: 500 });
  }
}