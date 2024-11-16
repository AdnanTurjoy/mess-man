import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import MessMember from '@/models/MessMember';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const { id } = params;

  try {
    const updates = await req.json();
    const updatedMember = await MessMember.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedMember) {
      return NextResponse.json(
        { success: false, message: 'MessMember not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedMember }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Failed to update member' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const { id } = params;

  try {
    const member = await MessMember.findById(id);

    if (!member) {
      return NextResponse.json(
        { success: false, message: 'MessMember not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: member }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch member' },
      { status: 500 }
    );
  }
}
