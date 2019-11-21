'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {

    permissions() {
        return this.belongsToMany('App/Models/Permission').pivotTable('role_has_permissions')
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

}

module.exports = Role
