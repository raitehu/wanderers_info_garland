import { NextResponse } from "next/server";
import { Put } from "@/app/_components/DynamoDB";
import { DateTime } from "luxon";

export async function POST(request) {
  const body = await request.json();

  console.log(JSON.stringify({
    level: "INFO",
    message: "[API] Registerが呼ばれました",
    body: body,
    timestamp: DateTime.local().setZone("Asia/Tokyo").toString()
  }));

  await Put(body.ExpireDate, body.TweetURL).catch((err) => {
    console.error(JSON.stringify({
      level: "ERROR",
      message: "[API] Registerでエラーが発生しました",
      body: err,
      timestamp: DateTime.local().setZone("Asia/Tokyo").toString()
    }));
    return NextResponse.json({}, { status: 500 });
  })
  return NextResponse.json({}, { status: 200 });
}
