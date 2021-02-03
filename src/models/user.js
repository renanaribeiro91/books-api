const mongoose = require('mongoose')
const { Schema } = mongoose                     // é a mesma coisa de que const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({

    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    },
    password:{
        type:String,
        required: true,
        select: false                            // tomar cuidado - pois pra pegar o password na hora de logar tem que passar mais um paremetro                     
    },
    email:{
        type:String,
        required: true
    },
    books: [{
        type:Schema.Types.ObjectId,
        ref:'books'
    }]

},{timestamps:true})

UserSchema.pre('save',async function (next){        // origatorio ter o "function" criptografia
    if(!this.isModified('password'))                // se o usuario n for modificado (password)
    return next()

    const hash = await bcrypt.hash(this.password,10) // 10 é o numero de vezes q vai ser gerada pra expirar
    this.password = hash
    next() 
     
})

module.exports = mongoose.model('Users',UserSchema)
