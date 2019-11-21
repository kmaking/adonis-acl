'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Role = use('App/Models/Role')
const Permission = use('App/Models/Permission')

/**
 * Resourceful controller for interacting with acls
 */
class AclController {

  /**
   * Show a list of permissions.
   * GET acls
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async permissions ({ request, response}) {
      const permissions = await Permission.all()
      return response.success('All Permissions List!...', permissions)
  }

  /**
   * Show a list of all acls.
   * GET acls
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ params, request, response}) {
      console.log(params);
      const roles = await Role.query().with('permissions').paginate(1, 10)
      return response.success('All Roles and Permissions List!...', roles)
  }

  /**
   * Create/save a new acl.
   * POST acls
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

      const { name, permissions } = request.all()

      const role = await Role.create({
          name: name
      });

      const all_permissions = await Permission.query().whereIn('name', permissions).ids();
      await role.permissions().sync(all_permissions)

      return response.success('Role Created Successfully!...', role)
  }

  /**
   * Display a single acl.
   * GET acls/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response}) {
  }

  /**
   * Update acl details.
   * PUT or PATCH acls/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
      const { name, permissions } = request.all()

      const role = await Role.find(params.id);

      role.name = name
      const all_permissions = await Permission.query().whereIn('name', permissions).ids();
      await role.permissions().sync(all_permissions)
      await role.save()

      return response.success('Role Updated Successfully!...', role)
  }

  /**
   * Delete a acl with id.
   * DELETE acls/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
      const role = await Role.find(params.id)
      await role.delete()

      return response.success('Role Deleted Successfully!...', role)
  }
}

module.exports = AclController
