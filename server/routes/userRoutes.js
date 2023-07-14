const { createUser, findUser, updateUser, deleteUser, getUsers } = require('../controllers/userControllers')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

//** CRUD Users **/

router.post('/user/create',async(req,res)=>{
    let response = await createUser(req.body)
    res.json(response)
})

router.post('/user/get',async(req,res)=>{
    try{
        const {token} = req.body
        if (token){
            const {SECRET_KEY} = process.env
            const {email,password} = jwt.decode(token,SECRET_KEY)
            let response = await findUser({email,password})
            res.json(response)
        }
        else{
            const {email,password} = req.body
            let response = await findUser({email,password})
            res.json(response)
        }
    }
    catch(e){
        console.log(e);
        res.json({
            status:false,
            error:'Couldn\'t find required data!'
        })
    }
})

router.post('/user/update',async(req,res)=>{
    try{
        const {credentials , newData} = req.body
        let response = await updateUser(credentials,newData)
        res.json(response)
    }
    catch(e){
        res.json({
            status:false,
            error:'Try again later!'
        })
    }
})

router.delete('/user/delete',async(req,res)=>{
    try{
        const {email , password} = req.body
        let response = await deleteUser({email,password})
        res.json(response)
    }
    catch(e){
        res.json({
            status:false,
            error:'Try again later!'
        })
    }
})


router.get('/user/find',async(req,res)=>{
    const {email_id} = req.query
    let response = await getUsers(email_id)
    res.json({
        status:true?response.length>0:false,
        users:response
    })
})

module.exports = router