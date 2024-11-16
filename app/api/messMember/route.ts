import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import MessMember from '@/models/MessMember';

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { members } = await req.json(); // Expecting an array of members
    if (!Array.isArray(members) || members.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid members array.' },
        { status: 400 }
      );
    }

    const newMembers = await MessMember.insertMany(members);
    return NextResponse.json({ success: true, data: newMembers }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Failed to add members' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectToDatabase();

  try {
    const members = await MessMember.find({});
    return NextResponse.json({ success: true, data: members }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}
