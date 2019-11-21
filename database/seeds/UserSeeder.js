'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Permission = use('App/Models/Permission')

class UserSeeder {
    async run () {
        await Database.raw("SET FOREIGN_KEY_CHECKS=0;");
        await Database.truncate("roles");
        await Database.truncate("permissions");
        await Database.truncate("role_has_permissions");
        await Database.truncate("users");
        await Database.truncate("tokens");
        await Database.raw("SET FOREIGN_KEY_CHECKS=1;");

        const role = await Role.create({
            name: 'super admin'
        });

        const permissions = await role.permissions().createMany([
            { id: 1, name: 'read acl' },
            { id: 2, name: 'create acl' },
            { id: 3, name: 'update acl' },
            { id: 4, name: 'delete acl' },
            { id: 5, name: 'read user' },
            { id: 6, name: 'create user' },
            { id: 7, name: 'update user' },
            { id: 8, name: 'delete user' },
        ]);

        const user = await User.create({
            role_id: role.id,
            name: 'Super Admin',
            mobile_number: '7698079937',
            password: '123456'
        })
    }
}

module.exports = UserSeeder
