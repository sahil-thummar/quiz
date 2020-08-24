const user = require('../../models/user/user')
const utils = require('../../lib/utils')

module.exports = {
    
    login: async (request_data, response_data) => {
        utils.check_request_params(request_data.body, [{name: 'Email', type: 'string'},{name: 'Password', type: 'string'}], function (response) {
            if (response.success) {
                const hash = utils.encryptPassword(request_data.body.Password)
                const u_name = ((request_data.body.Email).trim()).toLowerCase()
                const Email = {}
                const Password = {}
                Email['Email'] = u_name
                Password['Password'] = hash
                user.findOne({$and: [ Email, Password]}).then((user) => {
                    if (!user) {
                        response_data.json({success: false})
                    } else {
                        response_data.json({
                            success: true
                        })
                    }
                }, (error) => {
                    response_data.json({
                        success: false
                    })
                })
            } else {
                response_data.json(response)
            }
        })
    }
    
}