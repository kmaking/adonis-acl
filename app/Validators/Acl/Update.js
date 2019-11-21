'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class AclStore extends BaseValidator {

    async authorize () {
        return true
    }

    get rules () {
        const userId = this.ctx.params.id

        return {
            name: `required|unique:roles,name,id,${userId}`,
            permissions: 'required'
        }
    }
}

module.exports = AclStore
