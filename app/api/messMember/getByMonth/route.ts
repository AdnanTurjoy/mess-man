import { NextResponse } from 'next/server';
import MessMember from '@/models/MessMember'; // Update with your model path
import connectToDatabase from '@/lib/db/mongodb';

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { year, month } = await req.json(); // Expecting year and month in the request body
    if (!year || !month) {
      return NextResponse.json(
        { success: false, message: 'Year and month are required.' },
        { status: 400 }
      );
    }

    // Calculate the start and end dates for the month
    const startDate = new Date(year, month - 1, 1); // Month is 0-indexed
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // Last day of the month

    // Fetch records within the date range
    const members = await MessMember.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ date: 1 }); // Sort by date, ascending

    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error('Error fetching MessMember data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch MessMember data.' },
      { status: 500 }
    );
  }
}
