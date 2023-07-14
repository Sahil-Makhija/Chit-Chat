const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv');
dotenv.config()
const {SECRET_KEY} = process.env


//CRUD for Users
const createUser = async(data) =>{
    if ((await findUser({email : data?.email}))?.status){
        return({
            status:false,
            error : 'User with this email address already exist!'
        })
    }
    else{
        const date = new Date()
        
        return(
            await User.create({...data,created_at : date.toDateString()+' '+date.toTimeString()}).then((userData)=>{
                const {email,password} = userData
                const token = jwt.sign({email,password},SECRET_KEY)
                return {
                status : true,
                success : 'User created successfully!',
                userData,token
            }
        }).catch((error)=>{
            return {
                status:false,
                error:error.message
            }
        })
        )
    }
}

const findUser = async(data)=>{
    
    return await User.findOne(data).then((userData)=>{
        if (userData === null){
            return {
                    status : false,
                    error : 'Invalid Username or Password!'
                }
        }
        else{
            const {email,password} = userData
            const token = jwt.sign({email,password},SECRET_KEY)
            return {
                    status: true,
                    success : 'User found',
                    userData,token
                }
        }
    }).catch((error)=>{
        return {
            status : false,
            error: error.message
        }
    })
}


const updateUser = async(credentials,newData)=>{
    const {email , password} = credentials
    const user_id = uuid()
    return await User.findOneAndUpdate({email,password},{...newData,user_id},{new : true }).then((updatedUserData)=>{
        const {email,password} = updatedUserData
        const token = jwt.sign({email,password},SECRET_KEY)
        return updatedUserData!==null ? {
            status : true,
            success:'User updated successfully',
            updatedUserData,token
        } : {
            status : false,
            error:'User not found with the given credentials!',
        } 
    }).catch((error)=>{
        return {
            status : false,
            error:error.message
        }
    })
}
const deleteUser = async(credentials)=>{
      return await User.findOneAndDelete(credentials).then((data)=>{
        return data===null ? {
            status:false,
            error:'User not found with the given credentials!',
        }:{
            status:true,
            success:'User deleted from the databse'
        }
    }).catch((error)=>{
        return {
            status:false,
            error:error.message
        }
    })
}
//********** */

//Search Other Users
const getUsers = async(email_id)=>{
    return await User.find().then((users)=>{
        return users.map((user)=>{
            const {username,email} = user
            return {
                username , email
            }
        }).filter((user)=>{
            return true?user.email.startsWith(email_id.toLowerCase()) : false
        })
    })
}

const getUserData = async(email)=>{
    return await User.findOne({email}).then((user)=>{
        const {username,email} = user
        return {
            username , email
        }
    })
}


module.exports = {createUser , findUser , updateUser,deleteUser,getUsers,getUserData}