const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");
 

module.exports.registerUser = async function(req, res){
    try{
        let{fullname, email, password} = req.body;

        let user = await UserModel.findOne({email: email});
        if(user) {
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/");
        }

        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(password, salt, async function(err, hash){
                if(err) return res.send(err.message);
                else{
                    let user = await UserModel.create({
                        fullname,
                        email,
                        password: hash,
                    });

                    let token = generateToken(user);
                    res.cookie("token",token);

                    res.redirect("/shop");
                }
            });
        });
    }
    catch(err){
        res.send(err.message);
    }
}



module.exports.loginUser = async function(req, res){
    let {email, password} = req.body;

    let user = await UserModel.findOne({email: email});
    if(!user) {
        req.flash("error", "Email or Password is incorrect");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        }
        else{
            req.flash("error", "Email or Password is incorrect");
            return res.redirect("/"); 
        }
    });
}

module.exports.LogOut = function(req, res){
    res.cookie("token", "");
    res.redirect("/");
}