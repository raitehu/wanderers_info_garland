import { NextResponse } from "next/server";
import { Put } from "@/app/_components/DynamoDB";

export async function POST(request) {
  const body = await request.json();

  await Put(body.ExpireDate, body.TweetURL).catch((err) => {
    console.error(err);
    return NextResponse.json({}, { status: 500 });
  })
  return NextResponse.json({}, { status: 200 });
}
