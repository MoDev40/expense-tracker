import connectDB from '@/app/config/connectDB';
import ExpenseModel from '@/app/models/ExpenseModel';
import UserModel from '@/app/models/UserModel';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  email: string;
};

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { email } = params;
  try {
    connectDB()
    const user = await UserModel.findOne({email})
    if(!user){
      return NextResponse.json({message:"user not found"},{status:404})
    }
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0)
    
    const expenses = await ExpenseModel.find({
      $and:[
        {user: user?._id},
        {createdAt:{
          $gte:startDate,
          $lte:endDate
        }}
      ]
    }).populate('tag').sort({ createdAt: -1 });

    return NextResponse.json({ expenses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}