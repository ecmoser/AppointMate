import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { apiKey } = await req.json();

  if (!apiKey) {
    return NextResponse.json({ error: "API key is required" }, { status: 400 });
  }

  try {
    // Cal.com API v2 uses the /bookings endpoint
    const bookingsResponse = await fetch("https://api.cal.com/v2/bookings", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "cal-api-version": "2024-08-13",
      },
    });

    console.log("Cal.com API Response Status:", bookingsResponse.status);

    if (!bookingsResponse.ok) {
      let errorData;
      try {
        errorData = await bookingsResponse.json();
      } catch (e) {
        errorData = { message: await bookingsResponse.text() };
      }
      console.error("Cal.com API Error:", errorData);
      return NextResponse.json(
        { 
          error: `Failed to fetch bookings from Cal.com (${bookingsResponse.status})`,
          details: errorData,
          status: bookingsResponse.status
        },
        { status: bookingsResponse.status }
      );
    }

    const data = await bookingsResponse.json();
    console.log("Cal.com API Response:", JSON.stringify(data, null, 2));
    
    // Handle different response structures from Cal.com
    let bookings = [];
    if (data.data) {
      bookings = Array.isArray(data.data) ? data.data : [];
    } else if (data.bookings) {
      bookings = Array.isArray(data.bookings) ? data.bookings : [];
    } else if (Array.isArray(data)) {
      bookings = data;
    }

    // Transform Cal.com bookings to match the expected format
    const events = bookings.map((booking: any) => ({
      id: booking.id?.toString() || booking.uid || String(Math.random()),
      start: booking.startTime || booking.start,
      end: booking.endTime || booking.end,
      summary: booking.title || booking.eventType?.title || booking.name || "Booking",
      description: booking.description || booking.notes || "",
      status: booking.status,
      attendees: booking.attendees || [],
      eventTypeId: booking.eventTypeId,
      userId: booking.userId,
      meetingUrl: booking.meetingUrl,
    }));

    console.log(`Transformed ${events.length} bookings into events`);
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
