const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    GroupName:{
        type:String
    },
    Admin:{
        type:String,
    },
    created_at : {
        type : String,
        required:[true,'Date&Time of creation is missing']
    },
    isGroup:{
        type : Boolean,
        default:false
    },
    members:{
        type:Array,
        required:[true]
    },
    latestMessage:{
        type:String
    }
})

const Conversation = mongoose.model('Conversation',conversationSchema)
module.exports=Conversation