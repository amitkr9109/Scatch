const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isloggedIn");
const ProductModel = require("../models/product-model");
const UserModel = require("../models/user-model");
const isloggedIn = require("../middlewares/isloggedIn");

router.get("/", function(req, res){
    let error = req.flash("error");
    res.render("index", {error, loggedin : false});
});

router.get("/shop", isLoggedIn, async function(req, res){
    let products = await ProductModel.find();
    res.render("shop", {products});
});

router.get("/cart", isloggedIn, async function(req, res){
    try {
        let user = await UserModel.findOne({ email: req.user.email }).populate("cart");

        if(!user || user.cart.length === 0){
            // req.flash("error", "No Items Here...");
            return res.render("cart", {user: null});
        }

        let totalamount = 0;
        user.cart.forEach(function(item){
            totalamount += Number(item.price) + 20 - Number(item.discount);
        });
        res.render("cart", { user, totalamount });
    } catch (error) {
        res.send("Something went wrong ...");
    }
});

router.get("/addtocart/:id", isLoggedIn, async function(req, res){
    let userdata = await UserModel.findOne({email: req.user.email});
    userdata.cart.push(req.params.id);
    await userdata.save();
    res.redirect("/cart");
});

router.get("/delete/:id", isLoggedIn, async function(req, res){
    let user = await UserModel.findOne({ email: req.user.email });
    user.cart = user.cart.filter(IdChheckMatched => IdChheckMatched.toString() !== req.params.id);
    await user.save();
    res.redirect("/cart");
});


module.exports = router;