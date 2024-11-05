// app/api/users/route.ts
import { NextResponse } from 'next/server';

import User from '@/models/User';
import connectToDatabase from '@/lib/db/mongodb';

export async function GET() {
  await connectToDatabase();

  try {
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { name, email } = await req.json();
    const newUser = new User({ name, email });
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
