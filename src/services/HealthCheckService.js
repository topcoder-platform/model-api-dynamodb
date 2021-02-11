/**
 * This service provides a method to check health.
 */
const config = require('config')
const helper = require('../common/helper')
const logger = require('../common/logger')
const errors = require('../common/errors')

let checksRun = 0

/**
 * Check health.
 * @returns {Object} the health check result
 */
async function check () {
  checksRun += 1
  // check DB connection by a simple query
  try {
    await helper.scan(config.AMAZON.DYNAMODB_CAT_TABLE)
  } catch (e) {
    throw new errors.ServiceUnavailableError(`DynamoDB is unavailable, ${e.message}`)
  }
  return { checksRun }
}

module.exports = {
  check
}

logger.buildService(module.exports)
