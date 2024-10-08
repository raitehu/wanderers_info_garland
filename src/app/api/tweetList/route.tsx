import { NextResponse } from "next/server";
import { Scan } from "@/app/_components/DynamoDB";

export const dynamic = "force-dynamic";

export async function GET() {
  console.log(JSON.stringify({
    level: "INFO",
    message: "[API] TweetListが呼ばれました",
    body: ""
  }));

  const basePeriod = Date.now()/1000; // 古いデータを表示しないための基準時間
  const response = await Scan()
    .then((data) => {
      // 古くなったデータを除外する
      return {
        Items: data.Items?.filter((item) => item.UnixTime >= basePeriod)
          .sort((a, b) => {
            if(a.UnixTime < b.UnixTime) return -1;
            if(a.UnixTime > b.UnixTime) return 1;
            return 0;
          })
      }
    })
    .catch((err) => {
    console.error(JSON.stringify({
      level: "ERROR",
      message: "[API] TweetListでエラーが発生しました",
      body: err
    }));
    return NextResponse.json({}, { status: 500 });
  })
  return NextResponse.json(response, { status: 200 });
}
