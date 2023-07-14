const { createMessage, fetchMessages } = require('../controllers/messageControllers')
const router = require('express').Router()


router.post('/fetch/messages',async(req,res)=>{
    try {
        const {conversation_id} = req.body
        res.status(200).json(await fetchMessages({conversation_id}))
    } catch (error) {
        console.log(error);
        res.status(500).json([])
    }
})



module.exports = router