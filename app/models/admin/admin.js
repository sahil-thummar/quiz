const mongo = require('mongoose');
const Schema = mongo.Schema;

const admin = new Schema({
    Username: {type: String, default: ""},
    Password: {type: String, default: ""},
    Server_token:{type: String, default: ""},
    Email: {type: String, default: ""},
    Created_At: { type: Date, default: Date.now },
    Updated_At: { type: Date, default: Date.now }
}, {
    strict: true,
    timestamps: {
        createdAt: 'Created_At',
        updatedAt: 'Updated_At'
    }
})

module.exports = mongo.model("admin", admin);