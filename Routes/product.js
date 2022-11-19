const express = require('express')
const router = express.Router()

const fs = require("fs")

const {SupabaseUpload,DownloadImg} = require('../Supabase/supabase')


router.get('/getImg',async (req,res,next)=>{
  try {



    res.send('file received')
  } catch (error) {
    console.log(error)
  }
  next()

})


router.post("/productUpload", async (req,res)=>{

    //  console.log(req.files)
     const files = JSON.parse(JSON.stringify(req.files))
    //  console.log(files.image.data.data)
    // console.log(files.image.data)
    // fs.writeFile('new.jpg',new Buffer.from(files.image.data.data),"binary",(err)=>{
    //   console.log(err)
    // })
    SupabaseUpload(files)
    res.send("Products Uploaded successfully")
})

router.get("/",(req,res)=>{
  console.log("hello you are at home")
  res.send("You came home")
})

module.exports = router
