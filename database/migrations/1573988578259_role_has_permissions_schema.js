'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleHasPermissionsSchema extends Schema {
  up () {
    this.create('role_has_permissions', (table) => {
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('permission_id').unsigned().references('id').inTable('permissions')
    })
  }

  down () {
    this.drop('role_has_permissions')
  }
}

module.exports = RoleHasPermissionsSchema
