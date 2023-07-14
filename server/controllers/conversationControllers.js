const Conversation = require("../models/conversationModel")
const User = require("../models/userModel")

const createConversation = async (convo_data) => {
    const { members } = convo_data
    return await findConversation({ members }).then((response) => {
        if (response !== null) {
            return { status: false, error: 'This Coversation already exist!' }

        }
        else {
            return Conversation.create(convo_data).then((convo) => {
                return {
                    status: true,
                    conversation_id: convo._id.toHexString()
                }
            }).catch((error) => { return { status: false, error: error.message } })
        }
    })

}

const findConversation = async (parameter) => {
    return await Conversation.findOne(parameter).then((convo) => {
        if (convo !== null ) {
            return convo
        }
        else {
            return {
                status: false,
                error: 'Coversation Name does not exist!'
            }
        }
    }).catch((error) => { return { status: false, error: error.message } })
}

const sendRequest = async (data) => {
    try {
        const { sender, receiver } = data
        await User.findOneAndUpdate({ email: sender.email }, { $push: { req_sent: receiver } }).catch((e)=>console.log(e))
        await User.findOneAndUpdate({ email: receiver.email }, { $push: { req_recd: sender } })
        return ({
            status: true,
            success: `Request sent to ${receiver.username}`
        })
    } catch (e) {
        console.log(e);
        return ({
            status: false,
            error: 'Invalid data given!'
        })
    }
}

const acceptRequest = async (data) => {
    try {
        const { accepted, sender, receiver } = data
        if (accepted) {
            const { conversation_id } = await createConversation({ members: [sender, receiver], created_at: new Date().toLocaleString() })
            await User.findOneAndUpdate({ email: sender.email }, { $push: { conversations: conversation_id } })
            await User.findOneAndUpdate({ email: receiver.email }, { $push: { conversations: conversation_id } })
        }
        await User.findOneAndUpdate({ email: sender.email }, { $pull: { req_sent: receiver } })
        await User.findOneAndUpdate({ email: receiver.email }, { $pull: { req_recd: sender } })
        return {
            status:true,
            success: accepted ? 'friend Req accepted' : 'friend req denied'
        }
    } catch (error) {
        console.log(e);
        return ({
            status: false,
            error: 'Invalid data given!'
        })
    }
}

const fetchConversations = async (arr) => {
    let response = await Promise.all(arr.map(async (convo) => {
        return await findConversation({ _id: convo })
    }))
    return response
}

module.exports = { createConversation, findConversation, fetchConversations, sendRequest,acceptRequest }