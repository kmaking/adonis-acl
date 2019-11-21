'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class AclStore extends BaseValidator {

    async authorize () {
        return true
    }

    get rules () {
        return {
            name: 'required|unique:roles,name',
            permissions: 'required'
        }
    }
}

module.exports = AclStore
