const results = require('../../models/common/result')

module.exports = {

    getresult: async (request_data, response_data) => {
        results.find({},function(err,data){
            response_data.send(data)
        })
    }
}