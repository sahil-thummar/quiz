const mongo = require('mongoose');
const Schema = mongo.Schema;

const user = new Schema({
    Username: {type: String, default: ""},
    Password: {type: String, default: ""},
    Email: {type: String, default: ""},    
    Created_At: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, {
    strict: true,
    timestamps: {
        createdAt: 'Created_At',
        updatedAt: 'updated_at'
    }
})

module.exports = mongo.model("user", user);