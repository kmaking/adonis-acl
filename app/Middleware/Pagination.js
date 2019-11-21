'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Pagination {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    // call next to advance the request

    const limit = 10;
    const maxLimit = 50;

    // request.query.page = (typeof request.query.page === 'string') ? parseInt(request.query.page, 10) || 1 : 1;
    // request.query.limit = (typeof request.query.limit === 'string') ? parseInt(request.query.limit, 10) || 0 : limit;
    //
    // if (request.query.limit > maxLimit) { request.query.limit = maxLimit; }
    // if (request.query.page < 1) { request.query.page = 1; }
    // if (request.query.limit < 0) { request.query.limit = 0; }
    //
    // request.skip = request.offset = (request.query.page * request.query.limit) - request.query.limit;

    await next()
  }
}

module.exports = Pagination
