const Message = require("../models/messageModel")

//*Create New Message
const createMessage = async(message) =>{
    return await Message.create(message).then((data)=>{
        return {
            status:true,
            success:'message sent'
        }
    }).catch((error)=>{
        return {
            status:false,
            error:error.message
        }
    })
}

const fetchMessages = async({conversation_id})=>{
    return await Message.find({conversation_id}).then((data)=>{
        return data
    }).catch((error)=>{
        console.log(error);
        return []
    })
}

module.exports = {createMessage,fetchMessages}