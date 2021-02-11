/**
 * Cat Service
 */
const Joi = require('joi')
const config = require('config')
const { v4: uuid } = require('uuid')
const helper = require('../common/helper')
const logger = require('../common/logger')

/**
 * List Cat.
 * @param {Object} criteria the search criteria
 * @returns {Object} the search result
 */
async function list (criteria) {
  const page = criteria.page
  const perPage = criteria.perPage
  const options = {}
  if (criteria.name) {
    options.name = { eq: criteria.name }
  }
  const allResult = await helper.scan(config.AMAZON.DYNAMODB_CAT_TABLE, options)
  const startIndex = (page - 1) * perPage
  const endIndex = page * perPage
  const result = allResult.slice(startIndex, endIndex)
  return { total: result.length, page, perPage, result }
}

list.schema = {
  criteria: Joi.object().keys({
    page: Joi.page(),
    perPage: Joi.perPage(),
    name: Joi.string()
  }),
  authUser: Joi.object()
}

/**
 * Get Cat entity by id.
 * @param {String} id the country id
 * @returns {Object} the country of given id
 */
async function getEntity (id) {
  return helper.getById(config.AMAZON.DYNAMODB_CAT_TABLE, id)
}

getEntity.schema = {
  id: Joi.id()
}

/**
 * Create Cat.
 * @param {Object} data the data to create country
 * @returns {Object} the created country
 */
async function create (data) {
  await helper.validateDuplicate(config.AMAZON.DYNAMODB_CAT_TABLE, 'name', data.name)
  data.id = uuid()
  // create cat in db
  return await helper.create(config.AMAZON.DYNAMODB_CAT_TABLE, data)
}

create.schema = {
  data: Joi.object().keys({
    name: Joi.string().required()
  }).required()
}

/**
 * Partially update Cat.
 * @param {String} id the country id
 * @param {Object} data the data to update country
 * @returns {Object} the updated country
 */
async function partiallyUpdate (id, data) {
  // get data in DB
  const cat = await helper.getById(config.AMAZON.DYNAMODB_CAT_TABLE, id)
  if (data.name && cat.name !== data.name) {
    await helper.validateDuplicate(config.AMAZON.DYNAMODB_CAT_TABLE, 'name', data.name)
    // then update data in DB
    return await helper.update(cat, data)
  } else {
    // data are not changed
    return cat
  }
}

partiallyUpdate.schema = {
  id: Joi.id(),
  data: Joi.object().keys({
    name: Joi.string()
  }).required()
}

/**
 * Update Cat.
 * @param {String} id the Cat id
 * @param {Object} data the data to update Cat
 * @returns {Object} the updated Cat
 */
async function update (id, data) {
  return partiallyUpdate(id, data)
}

update.schema = {
  id: Joi.id(),
  data: Joi.object().keys({
    name: Joi.string().required()
  }).required()
}

/**
 * Remove Cat.
 * @param {String} id the Cat id to remove
 */
async function remove (id) {
  // remove data in DB
  const cat = await helper.getById(config.AMAZON.DYNAMODB_CAT_TABLE, id)
  await helper.deleteItem(cat)
}

remove.schema = {
  id: Joi.id()
}

module.exports = {
  list,
  getEntity,
  create,
  partiallyUpdate,
  update,
  remove
}

logger.buildService(module.exports)
