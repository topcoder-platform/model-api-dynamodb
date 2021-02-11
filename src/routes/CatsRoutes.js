/**
 * Records API Routes
 */

module.exports = {
  '/cats': {
    get: {
      controller: 'CatController',
      method: 'list'
    },
    post: {
      controller: 'CatController',
      method: 'create'
    }
  },
  '/cats/:catId': {
    get: {
      controller: 'CatController',
      method: 'getEntity'
    },
    put: {
      controller: 'CatController',
      method: 'update'
    },
    patch: {
      controller: 'CatController',
      method: 'partiallyUpdate'
    },
    delete: {
      controller: 'CatController',
      method: 'remove'
    }
  }
}
