/**
 * Clean Data
 */

require('../src/bootstrap')
const logger = require('../src/common/logger')
const scriptHelper = require('./helpers')
const helper = require('../src/common/helper')

/**
 * Remove all data in the table based on lookupName
 * @param {String} lookupName
 */
const cleanData = async (lookupName) => {
  const [getTableName] = await scriptHelper.getLookupKey(lookupName)
  const records = await helper.scan(getTableName)
  for (const record of records) {
    try {
      await record.delete()
    } catch (e) {
      logger.logFullError(e)
    }
  }
}
(async function () {
  if (process.env.NODE_ENV !== 'development') {
    logger.error('Clean data should be executed in development env')
    process.exit()
  }

  Object.keys(require('../src/models')).forEach(function (key) {
    cleanData(key).then(() => {
      logger.info(`Deleted data from lookup ${key}`)
    }).catch((e) => {
      logger.logFullError(e)
    })
  })
})()
