import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const dynamic = "force-dynamic";

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

export async function GET() {
  const command = new ScanCommand({
    TableName: "Garland", // TODO テーブル名は環境変数にする
  });

  const response = await docClient.send(command); // TODO エラーハンドリング
  console.log(response);

  return NextResponse.json(response);
}
