const User = require('../models/user')
const Book = require('../models/books')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');




const createToken = (userId) =>{
    return jwt.sign({id: userId},'churumel',{ expiresIn : 86400}); // token - id , senha e expirar em 7 dias
}

module.exports = {
    async findAll (req,res) {
        try{
            const users = await User.find({})
            return res.status(200).send(users)
    
        }catch(err){
            res.status(400).send({error:'Erro ao buscar dados ' + err})
        }
 
    },

    async findOneUser (req,res){
        try{
            const { id } = req.params
            const user = await User.findOne({_id:id})
            if(!user) { return res.status(200).send('Usuário não existe') } 
            return res.status(200).send(user)
    
        }catch(err){
            res.status(400).send({error:'Erro ao buscar usuário ' +err})
        }
    },
    async createUser (req,res){
        const {name,age,password,email} = req.body 
        const user = {name,age,password,email} 
        if(!email || !password) return res.status(400).send({error: 'dados insuficiente'})
        try{
            if(await User.findOne({email}))                        
            return res.status(400).send({error:"User alreade exists"})
           
            const createdUser = await User.create(user)
            delete createdUser.password                               
            return res.send({createdUser,token: createToken({id:user.id})}) // 
    
        }catch(err){
            return res.status(400).send({error:"erro ao criar usuário " + err})
            
        }
       
    },
    async authUser(req,res){
            const {password,email} = req.body
        
            if(!email || !password) return res.send("dados insuficientes")
        try{ 
            const user = await User.findOne({email}).select('+password')  // autenticando
            if(!user) return res.status(400).send({error:"user not found"})  // se nao tiver usario
            const pass_ok = await bcrypt.compare(password,user.password)
            if(!pass_ok)return res.status(400).send({error:'invalid passord'})           // comparando senhas para autenticar
            user.password = undefined
    
            res.send({user,token: createToken({id:user.id})})


        }catch(err){
            return res.send({erro:"erro ao buscar usuario"})

        }
    
    },
    async deleteUser(req,res){
        try{
            const { id } = req.params
            const user = await User.findOne({_id:id})
            if(!user) { return res.status(200).send('Usuário não existe') } 
            await User.remove({id})
            return res.status(200).send('Usuario deletado')
    
        }catch(err){
            res.status(400).send({error:'Erro ao buscar usuário ' +err})
        }
    },
    async updateUser(req,res){
        try{
            const { id } = req.params
            const { age } = req.body
            const user = await User.findOne({_id: id})
            if(!user) {return res.status(400).send('usuário nao existe')}
            user.age = age
            await user.save()
            return res.status(200).send(user)

        }catch(err){
            return res.status(500).send('erro ao atualizar')
        }
    },
    async addBooks(req,res){
        try{
            const { id } = req.params
            const { bookName } = req.body
            const user = await User.findOne({_id:id})
            if(!user) return res.status(400).send('usuário nao existe')
            const book = await Book.findOne({name: bookName}) 
            if(!book) return res.status(400).send('livro nao existe')
            const bookId = book.id
            user.books.push(bookId)
            await user.save()
            // book.userId id
            // await book.save()
            return res.status(200).send(user)
        }catch(err){
            return res.status(500).send('erro ao atualizar')
        }
    }
}




