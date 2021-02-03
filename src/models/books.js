const mongoose = require('mongoose')
const { Schema } = mongoose 

const BooksSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    number_pages:{
        type:Number,
        required:true
    },
    prices:{
        type:Number,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    }
    
       
},{timestamps:true})

module.exports = mongoose.model('Books',BooksSchema)