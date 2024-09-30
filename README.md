# ![GARLAND](cover-garland.png)

## GARLANDについて

ネップリ一覧化サービス GARLAND はその語源の花環のように、すばらしいファンアートでグループとコミュニティを彩りたいという願いから生まれたサービスです。

GARLANDはバーチャルサーカス団VALIS様のファンアートのネップリを広報することを目的としています。

本サービスの開発・運営はVALIS公式様とは無関係の、有志のファンによって行っていますので、本サービスへの質問やお問合せはVALIS公式様ではなく[WANDERER'S INFO運営](https://twitter.com/WANDERERSINFO)のDMまでお願いいたします。

## ローカル開発

### Getting Started

#### LocalStack

```bash
docker compose up

# ~/.aws/credentials
# [localstack]
# aws_access_key_id = dummy
# aws_secret_access_key = dummy

# ~/.aws/config
# [profile localstack]
# region = ap-northeast-1
# output = json

# Create DynamoDB Garland Table
aws --profile localstack dynamodb create-table \
--table-name Garland \
--attribute-definitions \
    AttributeName=TweetURL,AttributeType=S \
    AttributeName=ExpireDate,AttributeType=S \
--key-schema \
    AttributeName=TweetURL,KeyType=HASH \
    AttributeName=ExpireDate,KeyType=RANGE \
--provisioned-throughput \
    ReadCapacityUnits=10,WriteCapacityUnits=5 \
--endpoint-url=http://localhost:4566
```

#### App Servcer

```bash
docker build . -t garland
docker run -p 3000:3000 \
  --link localstack:localstack \
  --net=wanderers_info_garland_localstack \
 garland
```

#### 動作確認

```bash
# DynamoDBに格納された値のチェック
aws --profile localstack dynamodb scan \
--table-name Garland \
--endpoint-url http://localhost:4566
```

## CI/CD

TODO

## 環境変数

TODO
