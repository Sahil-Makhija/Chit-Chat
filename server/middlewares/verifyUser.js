const verifyUser = async (req, res, next) => {

    const { token, email } = req.body
    return await User.findOne({ user_id: token }).then((userData) => {
        if (userData?.email === email) {
            next()
            return true
        }
        else { 
            res.json({
                status:false,
                error:'Coudn\'t verify user!'
            })
            return false }
    }).catch(() => {
        res.json({
            status:false,
            error:'Coudn\'t verify user!'
        })
        return false
    })
}

module.exports = {verifyUser}