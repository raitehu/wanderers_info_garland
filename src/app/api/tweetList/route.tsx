import { NextResponse } from "next/server";
import { Scan } from "@/app/_components/DynamoDB";

export const dynamic = "force-dynamic";

export async function GET() {
  const basePeriod = Date.now(); // 古いデータを表示しないための基準時間
  const response = await Scan()
    .then((data) => {
      console.log(basePeriod);
      console.log(data);
    })
    .catch((err) => {
    console.error(err);
    return NextResponse.json({}, { status: 500 });
  })
  return NextResponse.json(response, { status: 200 });
}
