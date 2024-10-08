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
  const command = new ScanCommand({
    TableName: tableName
  });

  const response = await docClient.send(command).catch((err) => {throw new Error(err)});
  return response;
}

export async function Put(expireDate: string, tweetURL: string) {
  const unixTime = DateTime.fromISO(expireDate, { zone: "Asia/Tokyo" }).toMills();
  const command = new PutCommand({
    TableName: tableName,
    Item: {
      UnixTime: unixTime,
      ExpireDate: expireDate,
      TweetURL: tweetURL,
    },
  });

  const response = await docClient.send(command).catch((err) => {throw new Error(err)});
  return response;
}
