import { NextResponse } from "next/server";
import { Scan } from "@/app/_components/DynamoDB";

export const dynamic = "force-dynamic";

export async function GET() {
  console.log('%o', {
    level: "INFO",
    message: "[API] TweetListが呼ばれました",
    body: ""
  });

  const basePeriod = Date.now()/1000; // 古いデータを表示しないための基準時間
  const response = await Scan()
    .then((data) => {
      // 古くなったデータを除外する
      return { Items: data.Items?.filter((item) => item.UnixTime >= basePeriod) }
    })
    .catch((err) => {
    console.error(err);
    return NextResponse.json({}, { status: 500 });
  })
  return NextResponse.json(response, { status: 200 });
}
