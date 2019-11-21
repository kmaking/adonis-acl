'use strict'

const BaseValidator = use('App/Validators/BaseValidator')

class UserStore extends BaseValidator {

    async authorize () {
        return true
    }

    get rules () {
        return {
            name: 'required',
            mobile_number: 'required|unique:users,mobile_number',
            role_id: 'required|exists:roles,id',
            password: 'required'
        }
    }
}

module.exports = UserStore
