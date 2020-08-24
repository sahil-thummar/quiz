const Admin = require('../../models/admin/admin')
const utils = require('../../lib/utils')

module.exports = {
    
    getadmin: async (request_data, response_data) => {
        Admin.findOne({},function(err,data){
            response_data.send(data)
        })
    },

    check_auth: async (request_data, response_data) => {
        console.log("check_auth");
        console.log(request_data.body);
        
        utils.check_request_params(request_data.body, [{name: 'admin_id', type: 'string'}], function (response) {
            if (response.success) {

                Admin.findOne({
                    _id: request_data.body.admin_id,
                    server_token: request_data.body.admin_token
                }).then((admin) => {
                    if (!admin) {
                        response_data.json({success: false})
                    } else {
                        response_data.json({ success: true, admin: admin })
                    }
                }, (error) => {
                    response_data.json({ success: false })
                })
            } else {
                response_data.json(response)
            }
        })
    },

    login: async (request_data, response_data) => {
        utils.check_request_params(request_data.body, [{name: 'Username', type: 'string'},{name: 'Password', type: 'string'}], function (response) {
            if (response.success) {
                
                const hash = utils.encryptPassword(request_data.body.Password)
                const u_name = ((request_data.body.Username).trim()).toLowerCase()
                
                const Username = {}
                Username['Username'] = u_name
                
                const Email = {}
                Email['Email'] = u_name
            
                const Password = {}
                Password['Password'] = hash
                
                Admin.findOne({$and: [{$or: [Username, Email]}, Password]}).then((admin) => {
                    if (!admin) {
                        response_data.json({success: false})
                    } else {
                        admin.server_token = utils.Generatetoken(32)
                        admin.save()
                        response_data.json({
                            success: true,
                            admin_data: admin
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
    },

    new_Password: async (request_data, response_data) => {
        utils.check_request_params(request_data.body, [], function (response) {
            if (response.success) {
                const oldPassword = utils.encryptPassword(request_data.body.oldPassword)
                Admin.findOne({_id: request_data.body.admin_id,Password: oldPassword}).then((admin) => {
                    if (admin) {
                        if (request_data.body.server_token !== null && admin.server_token !== request_data.body.server_token) {
                            response_data.json({success: false})
                        } else {
                            admin.Password = utils.encryptPassword(request_data.body.newPassword)
                            admin.server_token = utils.Generatetoken(32)
                            admin.save(function (error) {
                                if (error) {
                                    response_data.json({success: false})
                                } else {
                                    response_data.json({success: true})
                                }
                            })
                        }
                    } else {
                        response_data.json({success: false})
                    }
                }, (error) => {
                    response_data.json({ success: false })
                })
            } else {
                response_data.json(response)
            }
        })
    }

}