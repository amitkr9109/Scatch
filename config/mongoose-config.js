const mongoose = require("mongoose");
const config = require("config");

const dbgr = require("debug")("development:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/Scatch`)
    .then(function(){
        dbgr("connected to MongoDB")
    })
    .catch(function(err){
        dbgr(err)
    });

module.exports = mongoose.connection;