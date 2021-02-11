const config = require('config')

/**
 * Get the table based on the lookupName
 * @param {String} lookupName
 */
async function getLookupKey (lookupName) {
  let table = []
  switch (lookupName) {
    case 'cats':
      table = [config.AMAZON.DYNAMODB_CAT_TABLE]
      break
    default:
      break
  }
  return table
}

module.exports = {
  getLookupKey
}
