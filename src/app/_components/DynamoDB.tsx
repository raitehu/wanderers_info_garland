import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const tableName = "Garland";
const client = new DynamoDBClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy"
  },
  endpoint: "http://localstack:4566"
});
const docClient = DynamoDBDocumentClient.from(client);

export async function Scan() {
  const command = new ScanCommand({
    TableName: tableName
  });

  const response = await docClient.send(command).catch((err) => {throw new Error(err)});
  return response;
}

export async function Put(expireDate: string, tweetURL: string) {
  const command = new PutCommand({
    TableName: tableName,
    Item: {
      ExpireDate: expireDate,
      TweetURL: tweetURL,
    },
  });

  const response = await docClient.send(command).catch((err) => {throw new Error(err)});
  return response;
}
