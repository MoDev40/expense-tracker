import { NextRequest, NextResponse } from "next/server";
import TagModel from "@/lib/models/TagModel";
import { TagInterface } from "@/types/types";
import connectDB from "@/app/config/connectDB";

type Params = {
  userId: string;
};

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { userId } = params;
  try {
    connectDB()

    const tags: TagInterface[] = await TagModel.find({
      $or: [
        { is_public: true },
        { user: userId },
        { $and: [{ user: { $ne: userId } }, { is_public: true }] },
      ],
    })
    return NextResponse.json({ tags }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}