const mongoose = require('mongoose')



function ConnectDB(){
    mongoose.connect('mongodb://localhost:27017/myapp',()=>{
    console.log('Connected')
})
}


module.exports = ConnectDB