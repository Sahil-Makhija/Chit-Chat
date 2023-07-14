const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required:[true,'Username is missing']
    },
    password : {
        type : String,
        required:[true,'Password is missing']
    },
    email : {
        type : String,
        required:[true,'Email address is missing']
    },
    created_at : {
        type : String,
        required:[true,'Date&Time of creation is missing']
    },
    req_sent:{
        type:Array,
        default:[]
    },
    req_recd:{
        type:Array,
        default:[]
    },
    conversations:{
        type:Array,
        default:['64a57c81c48dd70b401cfa35']
    }
})

 const User = mongoose.model('User',userSchema)
 module.exports = User
