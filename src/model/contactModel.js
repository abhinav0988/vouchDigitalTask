let mongoose = require("mongoose")

let ContactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: Number,
        requied: true
    },
    emailid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        requied: true
    },
    address: {
        type: String,
        required: true
    },
    isdeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

module.exports = mongoose.model("contact", ContactSchema)