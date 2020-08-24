const mongoose = require('mongoose')
const logger = require('pino')({ level: 'debug' });

module.exports = {

    pino: require('pino'),
    
    responseGenerators: function (responseData, responseStatusCode, responseStatusMsg, responseErrors) {
        const responseJson = {}
        responseJson['data'] = responseData
        responseJson['status_code'] = responseStatusCode
        responseJson['status_message'] = responseStatusMsg
        // errors
        if (responseErrors === undefined) {
            responseJson['response_error'] = []
        } else {
            responseJson['response_error'] = responseErrors
        }       
        return responseJson
    },

    check_request_params: function (request_data_body, params_array, response) {
        const missing_param = '';
        const is_missing = false;
        const invalid_param = '';
        const is_invalid_param = false;
    
        params_array.forEach(function (param) {
            if(request_data_body[param.name] == undefined){
                missing_param = param.name;
                is_missing = true;
            } else {
                if(param.type && typeof request_data_body[param.name] !== param.type){
                    is_invalid_param = true;
                    invalid_param = param.name;
                }
            }
        });
    
        if(is_missing){
            console.log("missing_param: "+missing_param)
            response({success: false, message: missing_param+' parameter missing'});
        } else if(is_invalid_param){
            console.log("invalid_param: "+invalid_param)
            response({success: false, message: invalid_param+' parameter invalid'});
        }
        else {
            response({success: true});
        }
    },

    encryptPassword: function (Password) {
        try {
            const crypto = require('crypto');
            return  crypto.createHash('md5').update(Password).digest('hex');
        } catch (error) {
            console.error(error);
        }
    },

    Generatetoken: function (length) {
        try {
            if (typeof length == "undefined")
                length = 32
            var token = "";
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++)
                token += possible.charAt(Math.floor(Math.random() * possible.length));
            return token;
        } catch (error) {
            console.error(error);
        }
    },

    saveFromBrowser: function (local_image_path, file_new_path) {
        const fs = require("fs");
        fs.readFile(local_image_path, function (err, data) {
            fs.writeFile(file_new_path, data, 'binary', function (err) {
                if (err) {
                    console.log(err)
                } else {
                    fs.unlink(local_image_path);
                    return file_new_path;
                }
            });
        });
    }

}