/**
 * Create tables in Amazon DynamoDB
 */

require('../src/bootstrap')
const logger = require('../src/common/logger')
const fs = require('fs')
const uuid = require('uuid').v4
const scriptHelper = require('./helpers')
const helper = require('../src/common/helper')

/**
 * Add data from the given file to the db and es.
 *
 * @param {String} lookupName
 * @param {String} lookupFilePath
 */
const loadData = async (lookupName, lookupFilePath) => {
  let duplicatesCount = 0
  let successfulsCount = 0
  let errorsCount = 0
  const rawdata = fs.readFileSync(lookupFilePath)
  const entities = JSON.parse(rawdata)

  const [getTableName] = await scriptHelper.getLookupKey(lookupName)
  for (const entity of entities) {
    try {
      // create record in db
      if (!entity.id) {
        entity.id = uuid()
      }
      await helper.create(getTableName, entity)
      successfulsCount += 1
    } catch (e) {
      if (e.name === 'ConflictError') {
        logger.error(`Duplicate Entity: ${JSON.stringify(entity)}`)
        duplicatesCount += 1
      } else {
        logger.error(`Error in Entity: ${JSON.stringify(entity)}`)
        errorsCount += 1
      }
    }
  }
  return [successfulsCount, duplicatesCount, errorsCount]
}
(async function () {
  if (process.env.NODE_ENV !== 'development') {
    logger.error('Load data should be executed in development env')
    process.exit()
  }

  Object.keys(require('../src/models')).forEach(function (fileName) {
    logger.info(`Load Data for lookup ${fileName} using file ./resources/${fileName}.json`)
    loadData(fileName, `./resources/${fileName}.json`).then((res) => {
      let str = `Loaded: ${res[0]}, Duplicates: ${res[1]}`
      if (res[2] > 0) {
        str = `${str}, Errors: ${res[2]}`
      }
      logger.info(str)
    }).catch((e) => {
      logger.logFullError(e)
    })
  })
})()
