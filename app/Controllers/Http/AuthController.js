'use strict'

class AuthController {

    async login ({ auth, request, response }) {
        const { username, password } = request.all()
        const result = await auth.withRefreshToken().attempt(username, password)
        return response.success('User Logged In Successfully!..', result)
    }

    async refreshToken ({ auth, request, response }) {
        const { refresh_token } = request.all()
        const result = await auth.generateForRefreshToken(refresh_token, true)
        return response.success('User Token Re-Generated Successfully!..', result)
    }

    async profile ({ auth, params, response }) {
        const user = auth.user
        await user.load('role.permissions')
        return response.success('Logged In User Information!..', user)
    }
}

module.exports = AuthController
