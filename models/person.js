const mongoose = require("mongoose")
const validator = require('validator')


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid...")
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    ctype:{
        type:String,
        enum:['frontend','backend','fullstack'],
        lowercase:true,
    }
})


const PERSON = mongoose.model("person",personSchema)

module.exports = PERSON