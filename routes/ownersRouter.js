const express = require("express");
const router = express.Router();
const OwnerModel = require("../models/owner-model");

router.get("/", function(req, res){
    res.send("owners page hai");
});

if(process.env.NODE_ENV === "development"){
    router.post("/create", async function(req, res){
        let owners = await OwnerModel.find();
        if(owners.length > 0){
            return res.status(505).send("You don't have permission to create a new owner.");
        }


        let {fullname, email, password} = req.body;

        let createdOwner = await OwnerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdOwner);
    });
}


router.get("/admin", function(req, res){
    let success = req.flash("success");
    res.render("createproducts", {success});
})



module.exports = router;