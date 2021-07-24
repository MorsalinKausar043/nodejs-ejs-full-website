const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    tokens: [{
        token: {
            type: String,
            required : true
        }
    }],
    date: {
        type: Date,
        default : Date.now
    }
});

// middleware

ejsDataSchema.methods.generatAuthontoken = async function () {
    try
    {
        const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        res.status(404).render("error" , {werror : error})
    }
}

ejsDataSchema.pre("save", async function (next) {
    if (this.isModified("password")) //kun event a kaj krte hobe ta bujhaise!! emple : password
    {
        this.password = await bcrypt.hash(this.password, 10);
        this.Cpassword = await bcrypt.hash(this.password, 10);
    }
})

const EjsUser = new mongoose.model("EjsUser", ejsDataSchema);

module.exports = EjsUser;