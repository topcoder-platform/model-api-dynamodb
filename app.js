/**
 * The application entry point
 */

require('./src/bootstrap')
const config = require('config')
const express = require('express')
const cors = require('cors')
const logger = require('./src/common/logger')
const HttpStatus = require('http-status-codes')
const bodyParser = require('body-parser')
const _ = require('lodash')
const helper = require('./src/common/helper')
const routes = require('./src/routes')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

const swaggerDocument = YAML.load('./docs/swagger.yaml')
const app = express()
const http = require('http').Server(app)

app.set('port', config.PORT)

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())

const apiRouter = express.Router()

/* eslint-disable no-param-reassign */
_.each(routes, (verbs, url) => {
  _.each(verbs, (def, verb) => {
    let actions = [
      (req, res, next) => {
        req.signature = `${def.controller}#${def.method}`
        next()
      }
    ]
    const method = require(`./src/controllers/${def.controller}`)[ def.method ]; // eslint-disable-line

    if (!method) {
      throw new Error(`${def.method} is undefined, for controller ${def.controller}`)
    }
    if (def.middleware && def.middleware.length > 0) {
      actions = actions.concat(def.middleware)
    }
    actions.push(method)
    logger.info(`API : ${verb.toLocaleUpperCase()} ${config.API_VERSION}${url}`)
    apiRouter[verb](`${config.API_VERSION}${url}`, helper.autoWrapExpress(actions))
  })
})
/* eslint-enable no-param-reassign */

app.use('/', apiRouter)
// app.use(errorMiddleware())
// Serve Swagger Docs after setting host and base path
swaggerDocument.host = config.HOST
swaggerDocument.basePath = config.API_VERSION
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// The error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.logFullError(err, req.signature || `${req.method} ${req.url}`)
  const errorResponse = {}
  const status = err.isJoi ? HttpStatus.BAD_REQUEST : (err.httpStatus || err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)

  if (_.isArray(err.details)) {
    if (err.isJoi) {
      _.map(err.details, (e) => {
        if (e.message) {
          if (_.isUndefined(errorResponse.message)) {
            errorResponse.message = e.message
          } else {
            errorResponse.message += `, ${e.message}`
          }
        }
      })
    }
  }
  if (_.isUndefined(errorResponse.message)) {
    if (err.message && status !== HttpStatus.INTERNAL_SERVER_ERROR) {
      errorResponse.message = err.message
    } else {
      errorResponse.message = 'Internal server error'
    }
  }

  res.status(status).json(errorResponse)
})

http.listen(app.get('port'), () => {
  logger.info(`Express server listening on port ${app.get('port')}`)
})

module.exports = app
