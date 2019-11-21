'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const AccessDeniedException = use('App/Exceptions/AccessDeniedException')

class HasPermission {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, request }, next, arg) {
    // call next to advance the request

    const user = await auth.user;
    await user.load('role.permissions')
    const _user = user.toJSON()

        if(!_user.role.permissions.some(item => arg.includes(item.name))) {
        throw new AccessDeniedException
    }

    await next()
  }
}

module.exports = HasPermission
