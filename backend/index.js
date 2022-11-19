require('dotenv').config({path: './config.env'})


const express = require('express')
const app = express()
const upload = require('express-fileupload')





const userRoute = require('../Routes/user')
const productRoute = require('../Routes/product')
const DataBaseConnect = require('../Database/ConnectDb/mongoose')
const Auth = require('../MiddleWare/authMiddleWare')

app.use(upload())
app.use(Auth)



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.raw())



// Connect To DataBase
DataBaseConnect();





app.use('/user',userRoute)
app.use('/',productRoute)


console.log(process.env.PORT)

app.listen(process.env.PORT,()=>{
    console.log('Express Server Running! on '+ process.env.PORT)
})