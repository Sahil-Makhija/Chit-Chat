const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender:{
        type:Object,
        required:[true,'SenderID is required!']
    },
    type:{
        type:String,
        default:'text'
    },
    content:{
        type:String,
        required:[true,'ReceiverID is required!'],
    },
    conversation_id:{
        type:String,
        required:[true,'ConversationID is required!'],
    },
    timestamp : {
        type : String,
        required:[true,'Date&Time of creation is missing']
    },
})

const Message =  mongoose.model('Message',messageSchema)

module.exports = Message