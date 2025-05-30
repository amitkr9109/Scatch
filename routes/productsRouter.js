const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const ProductModel = require("../models/product-model");

router.post("/create", upload.single("image"), async function(req, res){

    try{
        let{name, price, discount, bgcolor, panelcolor, textcolor} = req.body;

    let product = await ProductModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
    });

    req.flash("success", "Product created successfully.");
    res.redirect("/shop");
    }
    catch(err){
        res.send(err.message);
    }
    
});


module.exports = router;