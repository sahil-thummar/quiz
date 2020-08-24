const mongo = require('mongoose');
const Schema = mongo.Schema;

const result = new Schema({
    result_title: {type: String, default: ""},
    Questions: { type: Array, default: [] },
    Created_At: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, {
    strict: true,
    timestamps: {
        createdAt: 'Created_At',
        updatedAt: 'updated_at'
    }
})

module.exports = mongo.model("result", result);