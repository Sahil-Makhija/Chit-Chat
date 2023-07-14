const {  fetchConversations, sendRequest, acceptRequest } = require('../controllers/conversationControllers')

const router = require('express').Router()

const globalRoom = {
      _id: '64a57c81c48dd70b401cfa35',
      GroupName: '#Global Chat',
      isGroup: true,
      members: [
            {
                  username:'Sahil Makhija',
                  email:'sahilmakhija667@gmail.com'
            },
            {
                  username:'Test User',
                  email:'testuser@gmail.com'
            }
      ],
      latestMessage: undefined,
      created_at: `${new Date().toLocaleString()}`
}

router.post('/send/request',async(req,res)=>{
      let response = await sendRequest(req.body)
      res.json(response)
})

router.post('/accept/request',async(req,res)=>{
      let response  = await acceptRequest(req.body)
      res.json(response)
})

router.post('/fetch/connections', async (req, res) => {
      try {
            const { connections } = req.body
            let response = await fetchConversations(connections)
            res.json({
                  connections: [...response, globalRoom]
            })
      }
      catch (e) {
            res.json({
                  status: false,
                  error: 'Invalid data supplied!'
            })
      }
})
module.exports = router