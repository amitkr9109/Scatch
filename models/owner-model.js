const { name } = require("ejs");
const mongoose = require("mongoose");

const OwnerSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    products: {
        type: Array,
        default: [],
    },
    picture: String,
    gstin: String,
});

module.exports = mongoose.model("owner", OwnerSchema);