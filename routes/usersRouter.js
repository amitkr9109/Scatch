const express = require("express");
const router = express.Router();
const {registerUser, loginUser, LogOut} = require("../controllers/authController");

router.get("/", function(req, res){
    res.send("users page hai");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", LogOut);

module.exports = router;