const quizs = require('../../models/common/quiz')

module.exports = {
    
    addquiz: (request_data, response_data) => {
        const quiz = new quizs(request_data.body)
        quiz.save().then(success => { 
            response_data.json({success: true}) 
        }).catch(err => { response_data.status(400).send("unable to save")})
    },

    getquizs: (request_data, response_data) => {
        quizs.aggregate( [ { $project : { name : 1, result: 1,city: 1, image:1,stallno:1, _id:1 } } ] ).then((data)=>{
            response_data.send(data)
        })
    },
}