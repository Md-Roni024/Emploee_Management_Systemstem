const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    block:{
        type:Boolean,
        default:false
    },
})

const UserDb = mongoose.model("userdb",schema)
module.exports = UserDb;