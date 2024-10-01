import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// TODO 認証周りをクラウドに乗せられるように修正する
const client = new DynamoDBClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy"
  },
  endpoint: "http://localstack:4566"
});
const docClient = DynamoDBDocumentClient.from(client);

export async function POST(request) {
  const body = await request.json()
  console.log("url", body.TweetURL);
  console.log("date" ,body.ExpireDate);

  const command = new PutCommand({
    TableName: "Garland", // TODO テーブル名は環境変数にする
    Item: {
      TweetURL: body.TweetURL,
      ExpireDate: body.ExpireDate,
    },
  });

  const response = await docClient.send(command); // TODO エラーハンドリング
  console.log(response);

  return NextResponse.json(
    { status: 201 }
  );
}
