const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')


const User = require('../Database/Schemas/userSchema')
const jwt = require('jsonwebtoken')
const Auth = require('../MiddleWare/authMiddleWare')

const generateToken = (id)=>{
    return jwt.sign({id},'1234567',{
        expiresIn: '600s'
    })
}



router.get('/',Auth, async (req,res,next)=>{

    try {
        const user = await User.findById(req.user).clone()
        res.json({data: user})
        next()
        return
    } catch (error) {
        console.log(error.message)
        res.status(401)
        res.json({message:'Check your Credentials pls'})
        next()
    }
    
})


const Encrypt = async(pwd)=>{
    const salt = await bcrypt.genSaltSync(10)
    const password = await bcrypt.hash(pwd,salt)
    return password
}
const Decrypt = async(password,hash)=>{
    const bool = await bcrypt.compare(hash, password)
    return bool
}


router.post('/changePassword',Auth, async (req,res,next)=>{
    console.log('change password route')
    try {
        const { OldPassword,NewPassword } = req.body
        const user = await User.findById(req.user)

        if(await Decrypt(user.password,OldPassword)) {
            const encrypt = await Encrypt(NewPassword)
            User.findByIdAndUpdate(req.user, { "password": encrypt }, (err,docs)=>{
                if(err) console.log(err)
                else console.log('Updated Successfully!')
            } )
            console.log('password has been updated')
            res.json({message:'Password Updated!'})
            next()
            return
        }  else {
            res.status(401)
            res.json({message:'Wrong Password!'})
            return
        }

    } catch (error) {
        res.json({
            message: error.message,
            stack: process.env.NODE_ENV==='development'? null : error.stack
        })
        return 
    }
})


router.post('/login', async (req,res,next)=>{
    try {
        const { name,email,password } = req.body

        if(!name || !email || !password) {
            res.status(401)
            res.json({message: 'Pls enter valid credentials'})
            next()
            return
        }

        const [user] = await User.find({email:email}).clone()
        if(user === undefined || user.firstName !== name) {
            res.status(401)
            res.json({message:'User does not exist'})
            next()
            return
        }

        if(await Decrypt(user.password,password)) {
            res.status(200)
            res.json({token: generateToken(user.id)})
            next()
        }   else {
            res.status(401)
            res.json({message:'Password is wrong!'})
            next()
        }


    } catch (error) {
        console.log(error.message)
    }
})


// Register new User
router.post('/register',async (req,res,next)=>{
    try {
        const {name,email,password,age} = req.body 
        const encrypt = await Encrypt(password)


        if(!req.body.name || !req.body.password || !req.body.email || !req.body.age) {
            res.status(401)
            res.json({message:'Send Correct Information!'})
            return
        }



        const user = await User.create({ firstName:name, email: email ,password: encrypt ,age:age })
        user.save()
    
        res.status(200).json({
            token: generateToken(user.id)
        })
        next()
    } catch (error) {
        console.log(error.message)
        res.status(401)
        res.json({
            message: error.message,
            stack: process.env.NODE_ENV==='development'? null : error.stack
        })
    }
})


router.put('/userUpdate',Auth, async (req,res,next)=>{

    try {
        const id = req.user
    
        const user = await User.findByIdAndUpdate(id,req.body,{new: true})
        res.status(200)
        res.json({message:'User has been updated'})
        next()
    } catch (error) {
        console.log(error.message)
        res.status(401)
        res.json({
            message: error.message,
            stack: process.env.NODE_ENV==='development'? null : error.stack
        })
    }

})


router.delete('/',Auth, async (req,res,next)=>{

    try {
        const user = await User.findByIdAndDelete(req.user, (error,docs)=>{
            if(error) {
                console.log(error.message)
                return
            }   else {
                console.log('Deleted successfully!')
            }
        }).clone()

        if(user === undefined) {
            res.status(401).json({
                message: 'Not found'
            })
            return
        }

        res.status(200)
        res.json({message:'Deleted Successfully'})
        next()
        return
    } catch (error) {
        console.log(error.message)
        res.status(401)
        res.json({
            message: error.message,
            stack: process.env.NODE_ENV==='development'? null : error.stack
        })
        next()
        return 
    }


})

module.exports = router