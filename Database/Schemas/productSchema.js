const { default: mongoose } = require("mongoose");


const productSchema = new mongoose.Schema({
    title:'',
    price:'',
    category:'',
    description:'',
    image:''
})

const Products = mongoose.model('product',productSchema)

module.exports = Products