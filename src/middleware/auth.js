const jwt = require("jsonwebtoken");
const EjsUser = require("../models/conn");

const auth = async (req, res, next) => {
    try
    {   
        const token = req.cookies.jwt;
        const userData = await jwt.verify( token, process.env.SECRET_KEY);
        const userMatch = await EjsUser.findOne({ _id : userData._id });
        // console.log(userMatch)
        
        req.token = token;
        req.userMatch = userMatch ;
        
        next();
        
    } catch (error) {
        res.status(404).render("error", { werror: error });
    }
}

module.exports = auth;