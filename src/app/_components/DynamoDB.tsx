import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DateTime } from "luxon";
import { ScanCommand, PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const tableName = process.env.TABLE_NAME;
const config = {
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string
  },
  endpoint: process.env.DYNAMODB_ENDPOINT
}
const client = new DynamoDBClient(config);
const docClient = DynamoDBDocumentClient.from(client);

export async function Scan() {
  const command = { TableName: tableName };

  console.log(JSON.stringify({
    level: "INFO",
    message: "DynamoDBからデータを取得します",
    body: command
  }));

  const response = await docClient
    .send(new ScanCommand(command))
    .then((res) => {
      console.log(JSON.stringify({
        level: "INFO",
        message: "DynamoDBからデータを取得しました",
        body: res
      }));
      return res;
    })
    .catch((err) => {throw new Error(err)});
  return response;
}

export async function Put(expireDate: string, tweetURL: string) {
  const unixTime = DateTime.fromISO(expireDate, { zone: "Asia/Tokyo" }).toMillis()/1000;
  const command = {
    TableName: tableName,
    Item: {
      UnixTime: unixTime,
      ExpireDate: expireDate,
      TweetURL: tweetURL,
    },
  };

  console.log(JSON.stringify({
    level: "INFO",
    message: "データをDynamoDBへ登録します",
    body: command
  }));

  const response = await docClient
    .send(new PutCommand(command))
    .catch((err) => {throw new Error(err)});
  return response;
}
