/**
 * Cat Controller
 */
const HttpStatus = require('http-status-codes')
const service = require('../services/CatService')
const helper = require('../common/helper')

/**
 * List cats
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function list (req, res) {
  const result = await service.list(req.query)
  helper.setResHeaders(req, res, result)
  res.send(result.result)
}

/**
 * Create Cat
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function create (req, res) {
  const result = await service.create(req.body)
  res.status(HttpStatus.CREATED).send(result)
}

/**
 * Get Cat
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function getEntity (req, res) {
  const result = await service.getEntity(req.params.catId)
  res.send(result)
}

/**
 * Update Cat
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function update (req, res) {
  const result = await service.update(req.params.catId, req.body)
  res.send(result)
}

/**
 * Partially update Cat
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function partiallyUpdate (req, res) {
  const result = await service.partiallyUpdate(req.params.catId, req.body)
  res.send(result)
}

/**
 * Remove Cat
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function remove (req, res) {
  await service.remove(req.params.catId)
  res.status(HttpStatus.NO_CONTENT).end()
}

module.exports = {
  list,
  create,
  getEntity,
  update,
  partiallyUpdate,
  remove
}
