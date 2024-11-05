// app/api/member/route.ts
import { NextResponse } from 'next/server';

import Member from '@/models/Member';
import connectToDatabase from '@/lib/db/mongodb';

export async function GET() {
  await connectToDatabase();

  try {
    const members = await Member.find({});
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { name, phoneNumber, fbAccount, nidNumber, permanentAddress } = await req.json();
    const newMember = new Member({ name, phoneNumber, fbAccount, nidNumber, permanentAddress });
    await newMember.save();
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}
