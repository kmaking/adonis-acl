'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

// All Guest Routes
Route.group(() => {

    Route.post('login', 'AuthController.login')
    Route.post('refresh/token', 'AuthController.refreshToken')

}).middleware('guest').prefix('api/v1')

// All Protected Routes
Route.group(() => {

    Route.get('profile', 'AuthController.profile')

    Route.resource('user', 'UserController')
        .apiOnly()
        .middleware(new Map([
            [['user.index', 'user.show'], ['hasPermission:read user']],
            [['user.store'], ['hasPermission:create user']],
            [['user.update'], ['hasPermission:update user']],
            [['user.destroy'], ['hasPermission:delete user']],
        ]))
        .validator(new Map([
            [['user.store'], ['User/Store']],
            [['user.update'], ['User/Update']]
        ]))

    Route.get('acl/permissions', 'AclController.permissions')
    Route.resource('acl', 'AclController')
        .apiOnly()
        .middleware(new Map([
            [['acl.index', 'acl.show'], ['hasPermission:read acl']],
            [['acl.store'], ['hasPermission:create acl']],
            [['acl.update'], ['hasPermission:update acl']],
            [['acl.destroy'], ['hasPermission:delete acl']],
        ]))
        .validator(new Map([
            [['acl.store'], ['Acl/Store']],
            [['acl.update'], ['Acl/Update']]
        ]))

}).middleware('auth').prefix('api/v1')
