const { ServiceProvider } = require('@adonisjs/fold')

class ResponseProvider extends ServiceProvider {
    async boot () {
        const Response = use('Adonis/Src/Response')
        const Request = use('Adonis/Src/Request')

        Response.macro('success', function (message, data = [], status = 200) {
            this.status(status).json({
                status: true,
                message, data
            })
        })

        Response.macro('fail', function (message, data = [], status = 422) {
            this.status(status).json({
                status: false,
                message, data
            })
        })
    }
}

module.exports = ResponseProvider
