require('dotenv').config({path: './config.env'})


const express = require('express')
const app = express()


const userRoute = require('../Routes/user')
const DataBaseConnect = require('../Database/ConnectDb/mongoose')
// const Auth = require('../MiddleWare/authMiddleWare')
// app.use(Auth)


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.raw())



// Connect To DataBase
DataBaseConnect();




app.use('/user',userRoute)


console.log(process.env.PORT)

app.listen(process.env.PORT,()=>{
    console.log('Express Server Running! on '+ process.env.PORT)
})