const jwt = require('jsonwebtoken')
const User = require(__dirname.replace("/MiddleWare","/Database/Schemas/userSchema"))



const Auth = async (req,res,next)=>{

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          
            try {
                let auth = req.headers.authorization.split(' ')[1]
                const decode = await jwt.verify(auth,process.env.JWT_KEY)
                const usr = await User.findById(decode.id)
                req.user = usr._id

                next()
                return
            } catch (error) {
                console.log(error.message+' so you need to Login again!')
                res.status(401).json({
                    message: error.message,
                    stack: process.env.NODE_ENV==='development'? null : error.stack
                })
                return 

            }   

        } 

        next()
}

module.exports = Auth