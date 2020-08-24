const mongo = require('mongoose');
const Schema = mongo.Schema;

const quiz = new Schema({
    Uniuq_Id: {type: Number},
    Title: {type: String, required: true, default: ""},
    Image: {type: String, default: ""},
    Video: {type: String, default: ""},
    Questions: {type: Array, default: []},
    Created_At: { type: Date, default: Date.now },
    Updated_At: { type: Date, default: Date.now }
}, {
    strict: true,
    timestamps: {
        createdAt: 'Created_At',
        updatedAt: 'Updated_At'
    }
})

module.exports = mongo.model("quiz", quiz);