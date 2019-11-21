'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AccessDeniedException extends LogicalException {
  /**
   * Handle this exception by itself
   */
   handle (error, { response }) {
     response.fail('You don\'t have permissions.', [], 401)
   }
}

module.exports = AccessDeniedException
