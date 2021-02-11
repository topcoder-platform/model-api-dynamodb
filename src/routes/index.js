/**
 * Defines the API routes
 */

const _ = require('lodash')
const catsRoutes = require('./CatsRoutes')
const healthCheckRoutes = require('./HealthCheckRoutes')

module.exports = _.extend({},
  catsRoutes,
  healthCheckRoutes
)
