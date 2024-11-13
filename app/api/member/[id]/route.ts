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

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = params; 
  try {
    const { name, phoneNumber, fbAccount, nidNumber, permanentAddress } = await req.json();

    // Create a new Member document with a reference to the existing User's ID
    const newMember = new Member({
      name,
      phoneNumber,
      fbAccount,
      nidNumber,
      permanentAddress,
      user: id,
    });

    await newMember.save();
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
