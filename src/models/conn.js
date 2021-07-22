const mongoose = require("mongoose");
const validator = require("validator");

const ejsDataSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        uppercase: true,
        minlangth : [2 , "invalid name"]
    },
    lname: {
        type: String,
        required: true,
        uppercase: true,
        minlangth : [2 , "invalid name"]
    },
    number: {
        type: Number,
        required: true,
        unique: true,
        min :[10 , "invalid number"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value))
            {
                throw new Error("invalid email")
            }
        }
    },
    address: {
        type: String,
        required: true,
        uppercase: true,
        minlangth : [2 , "invalid name"]
    },
    gender: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required: true,
        minlangth : [4 , "minimum 4 charecter!"]
    },
    Cpassword: {
        type: String,
        required: true,
        minlangth : [4 , "minimum 4 charecter!"]
    },
    date: {
        type: Date,
        default : Date.now
    }
});

const EjsUser = new mongoose.model("EjsUser", ejsDataSchema);

module.exports = EjsUser;