import ExpenseModel from '@/app/models/ExpenseModel';
import UserModel from '@/app/models/UserModel';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  _id: string;
};

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { _id } = params;
  try {
    const user = await UserModel.findOne({email:_id})
    if(!user){
      return NextResponse.json({message:"unAuthorized User"},{status:200})
    }

    const expenses = await ExpenseModel.find({ user: user._id })
      .populate('tag', 'name tag')
      .sort({ createdAt: -1 });

    return NextResponse.json({ expenses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}