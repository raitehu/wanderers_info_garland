import { NextResponse } from "next/server";
import { Scan } from "@/app/_components/DynamoDB";

export const dynamic = "force-dynamic";

export async function GET() {
  const response = await Scan().catch((err) => {
    console.error(err);
    return NextResponse.json({}, { status: 500 });
  })
  return NextResponse.json(response, { status: 200 });
}
