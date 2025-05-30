const JWT = require("jsonwebtoken");

const generateToken = function(user){
    // console.log(process.env.JWT_KEY);
    return JWT.sign({email: user.email, id: user._id},process.env.JWT_KEY);
};

module.exports.generateToken = generateToken;