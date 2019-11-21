'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
      const users = await User.query().paginate(1, 10)
      return response.success('All Users List!...', users)
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   async store ({ request, response }) {

       const user = await User.create(request.all())

       return response.success('User Created Successfully!..', user)
   }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
      const user = await User.find(params.id)

      const body = request.only(['name', 'mobile_number', 'role_id', 'password'])

      user.name = body.name
      if(user.mobile_number !== body.mobile_number) user.mobile_number = body.mobile_number
      if(body.password !== undefined) user.password = body.password
      user.role_id = body.role_id

      await user.save()

      return response.success('User Updated Successfully!...', user)
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
      const user = await User.find(params.id)
      await user.delete()
      
      return response.success('User Deleted Successfully!...', user)
  }
}

module.exports = UserController
