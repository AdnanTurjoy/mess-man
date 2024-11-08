// app/api/member/route.ts
import { NextResponse } from "next/server";

import Member from "@/models/Member";
import connectToDatabase from "@/lib/db/mongodb";

export async function GET() {
  await connectToDatabase();

  try {
    const members = await Member.find({}).populate('user'); // Populate the user data
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { name, phoneNumber, fbAccount, nidNumber, permanentAddress, userId } = await req.json();

    // Create a new Member document with a reference to the existing User's ID
    const newMember = new Member({
      name,
      phoneNumber,
      fbAccount,
      nidNumber,
      permanentAddress,
      user: userId,
    });

    await newMember.save();
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
