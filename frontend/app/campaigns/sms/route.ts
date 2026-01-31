// import { NextResponse } from "next/server";

// export async function GET() {
//   const res = await fetch(`${process.env.TELI_BASE_URL}/v1/sms-campaigns`, {
//     headers: {
//       "X-API-Key": process.env.TELI_API_KEY!,
//     },
//   });
//   const data = await res.json();
//   return NextResponse.json(data);
// }

// export async function POST(req: Request) {
//   const body = await req.json();

//   const res = await fetch(`${process.env.TELI_BASE_URL}/v1/sms-campaigns`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-API-Key": process.env.TELI_API_KEY!,
//     },
//     body: JSON.stringify(body),
//   });

//   const data = await res.json();
//   return NextResponse.json(data);
// }
