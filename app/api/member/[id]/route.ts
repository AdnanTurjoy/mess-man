// app/api/member/[id]/route.ts
import { NextResponse } from "next/server";
import Member from "@/models/Member";
import connectToDatabase from "@/lib/db/mongodb";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  await connectToDatabase();

  const { id } = params;

  try {
    const member = await Member.findById(id);
    if (member) {
      return NextResponse.json(member, { status: 200 });
    } else {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch member" },
      { status: 500 }
    );
  }
}
