# Dynamodb Interaction

Most, if not all, of Topcoder's apis (especially the ones that follow v5 standards) use Dynamodb as their primary database. It is thus essential that Topcoder members understand how best to integrate Dynamodb in their apis.

## Template

This folder contains the template for interacting with Dynamodb. You can go through it and understand how to integrate with it.

### System requirements

- NodeJS (v14 used during development)
- AWS DynamoDB
- Java 6+ (used if using runnable jar of local DynamoDB)
- Docker, Docker Compose (used if using docker of local DynamoDB/Elasticsearch)

### Configuration

Configuration for the application is at `config/default.js` and `config/production.js`. The following parameters can be set in config files or in env variables:

- LOG_LEVEL: the log level
- PORT: the server port
- API_VERSION: the API version
- AMAZON.AWS_ACCESS_KEY_ID: The Amazon certificate key to use when connecting. For local dynamodb you can set fake value.
- AMAZON.AWS_SECRET_ACCESS_KEY: The Amazon certificate access key to use when connecting. For local dynamodb you can set fake value.
- AMAZON.AWS_REGION: The Amazon region to use when connecting. For local dynamodb you can set fake value.
- AMAZON.IS_LOCAL_DB: Use local or AWS Amazon DynamoDB
- AMAZON.DYNAMODB_URL: The local url, if using local Amazon DynamoDB
- AMAZON.DYNAMODB_READ_CAPACITY_UNITS: the AWS DynamoDB read capacity units, if using local Amazon DynamoDB
- AMAZON.DYNAMODB_WRITE_CAPACITY_UNITS: the AWS DynamoDB write capacity units, if using local Amazon DynamoDB
- AMAZON.DYNAMODB_CAT_TABLE: DynamoDB table name for cats

Test configuration is at `config/test.js`. You don't need to change them. The following test parameters can be set in config file or in env variables:

- AMAZON.DYNAMODB_CAT_TABLE: The cats DynamoDB table used during unit/e2e tests (`test_` is appended to the table name automatically)

### Local DynamoDB setup (Optional)

This page `https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html` provides several ways to deploy local DynamoDB. If you want to use runnable jar of local DynamoDB:

- see `https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html` for details
- download the local DynamoDB of your region
- extract out the downloaded archive
- ensure Java 6+ is installed
- in the extracted folder, run `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`
- local DynamoDB is running at `http://localhost:8000`

If you want to use docker of local DynamoDB:

- see `https://hub.docker.com/r/amazon/dynamodb-local` for details
- you may go to `db-docker` folder, and run `docker-compose up` to start local DynamoDB
- local DynamoDB is running at `http://localhost:8000`

### AWS DynamoDB

Properly configure AMAZON.AWS_ACCESS_KEY_ID, AMAZON.AWS_SECRET_ACCESS_KEY, AMAZON.AWS_REGION, AMAZON.IS_LOCAL_DB
in config file or via environment variables. You may create tables using below `npm run create-tables` command.

### Local Deployment

- Install dependencies `npm install`
- Run lint `npm run lint`
- Run lint fix `npm run lint:fix`
- To delete DynamoDB table if needed `npm run delete-tables` **WARNING: This deletes all tables**
- To create DynamoDB table if needed `npm run create-tables`
- Start app `npm start`
- App is running at `http://localhost:2002`

### Load/Clean Data

- Set development env `export NODE_ENV=development`
- To add data to DynamoDB table and es `npm run load-data`
    > **Example:** `npm run load-data`

- To delete data from  DynamoDB table and es `npm run clean-data` **WARNING: This deletes all the data in the db**
    > **Example:** `npm run clean-data`
