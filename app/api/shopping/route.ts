import connectToDatabase from '@/lib/db/mongodb';
import Shopping from '@/models/Shopping';
import { NextResponse } from 'next/server';


// API route to add a shopping entry
export async function POST(req: Request) {
	await connectToDatabase();

  try {
    const { cost, shoppingDetails, memberName, date } = await req.json();

    if (!cost || !memberName) {
      return NextResponse.json({ success: false, message: 'Cost and memberName are required.' }, { status: 400 });
    }

    const newShopping = new Shopping({
      cost,
      shoppingDetails,
      memberName,
	  date: date ? new Date(date) : undefined, 
    });

    await newShopping.save();
    return NextResponse.json({ success: true, data: newShopping }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to add shopping entry.' }, { status: 500 });
  }
}

// API route to update a shopping entry
export async function PUT(req: Request) {
	await connectToDatabase();
  
	try {
	  const { id, cost, shoppingDetails, memberName, date } = await req.json();
  
	  if (!id || !cost || !memberName) {
		return NextResponse.json({ success: false, message: 'ID, cost, and memberName are required.' }, { status: 400 });
	  }
  
	  const updatedShopping = await Shopping.findByIdAndUpdate(
		id,
		{
		  cost,
		  shoppingDetails,
		  memberName,
		  date: date ? new Date(date) : undefined, // Update date only if it's provided
		},
		{ new: true } // Return the updated document
	  );
  
	  if (!updatedShopping) {
		return NextResponse.json({ success: false, message: 'Shopping entry not found.' }, { status: 404 });
	  }
  
	  return NextResponse.json({ success: true, data: updatedShopping });
	} catch (error) {
	  console.error(error);
	  return NextResponse.json({ success: false, error: 'Failed to update shopping entry.' }, { status: 500 });
	}
  }
