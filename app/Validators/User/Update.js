'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class UserStore extends BaseValidator {

    async authorize () {
        return true
    }

    get rules () {
        const userId = this.ctx.params.id

        return {
            name: 'required',
            mobile_number: `required|unique:users,mobile_number,id,${userId}`,
            role_id: 'required|exists:roles,id',
        }
    }
}

module.exports = UserStore
