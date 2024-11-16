import connectToDatabase from '@/lib/db/mongodb';
import Shopping from '@/models/Shopping';
import { NextResponse } from 'next/server';


// API route to add a shopping entry
export async function GET(
	request: Request,
	{ params }: { params: { date: string } }
  ) {
	try {
	  await connectToDatabase();
	  
	  // Get date from URL parameters
	  const url = new URL(request.url);
	  const dateParam = url.searchParams.get('date');
  
	  if (!dateParam) {
		return NextResponse.json(
		  { 
			success: false, 
			message: 'Date parameter is required' 
		  }, 
		  { status: 400 }
		);
	  }
  
	  // Create date range for the query
	  const queryDate = new Date(dateParam);
	  
	  // Validate date
	  if (isNaN(queryDate.getTime())) {
		return NextResponse.json(
		  { 
			success: false, 
			message: 'Invalid date format' 
		  }, 
		  { status: 400 }
		);
	  }
  
	  // Set start and end of the day
	  const startOfDay = new Date(
		queryDate.getFullYear(),
		queryDate.getMonth(),
		queryDate.getDate(),
		0, 0, 0, 0
	  );
	  
	  const endOfDay = new Date(
		queryDate.getFullYear(),
		queryDate.getMonth(),
		queryDate.getDate(),
		23, 59, 59, 999
	  );
  
	  // Find shopping entries for the specified date
	  const shoppingEntries = await Shopping.find({
		date: {
		  $gte: startOfDay,
		  $lte: endOfDay
		}
	  }).lean();
  
	  // Check if there are any entries
	  const isDateAvailable = shoppingEntries.length === 0;
  
	  return NextResponse.json({
		success: true,
		isAvailable: isDateAvailable,
		data: {
		  entries: shoppingEntries,
		  date: dateParam,
		  count: shoppingEntries.length
		}
	  });
  
	} catch (error) {
	  console.error('Error in GET /api/shopping:', error);
	  
	  return NextResponse.json(
		{ 
		  success: false, 
		  message: 'Internal server error',
		  error: error instanceof Error ? error.message : 'Unknown error'
		}, 
		{ status: 500 }
	  );
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
