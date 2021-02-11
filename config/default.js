/**
 * Default configuration file
 */

module.exports = {
  DISABLE_LOGGING: process.env.DISABLE_LOGGING || false, // If true, logging will be disabled
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  PORT: process.env.PORT || 2002,
  AMAZON: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || 'FAKE_ACCESS_KEY',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'FAKE_SECRET_ACCESS_KEY',
    AWS_REGION: process.env.AWS_REGION || 'us-east-1',
    IS_LOCAL_DB: process.env.IS_LOCAL_DB ? process.env.IS_LOCAL_DB === 'true' : false,
    // Below three configuration is required if IS_LOCAL_DB is true
    DYNAMODB_URL: process.env.DYNAMODB_URL || 'http://localhost:8000',
    DYNAMODB_READ_CAPACITY_UNITS: process.env.DYNAMODB_READ_CAPACITY_UNITS || 10,
    DYNAMODB_WRITE_CAPACITY_UNITS: process.env.DYNAMODB_WRITE_CAPACITY_UNITS || 5,
    // table name is model name
    DYNAMODB_CAT_TABLE: process.env.DYNAMODB_CAT_TABLE || 'cats'
  },
  API_VERSION: process.env.API_VERSION || '/v5/model-api/dynamodb',
  DEFAULT_MESSAGE: 'Internal Server Error'
}
