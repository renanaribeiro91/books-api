const Book = require('../models/books')
const User = require('../models/user')


module.exports = {
    async findAll (req,res){
        try{
            const books = await Book.find({})
            return res.status(200).send(books)
    
        }catch(err){
            res.status(400).send({error:'Erro ao buscar dados ' + err})
        }
    },
    async findOneBook (req,res){
        try{
            const { id } = req.params
            const book = await Book.findOne({_id:id})
            if(!book) { return res.status(200).send('dados não existe') } 
            return res.status(200).send(book)
        }catch(err){
            res.status(400).send({error:'Erro ao buscar dados ' +err})
        }
        
    },
    async createBook(req,res){
        try{
            const {name,number_pages,prices,author} = req.body
            const book = {name,number_pages,prices,author} 
            const createBook = await Book.create(book)
            return res.status(200).send(createBook)

        }catch(err){
            res.status(400).send({error:'Erro ao criar dados ' +err})
        }
    },
    async updateBook(req,res){
        try{
            const {id} = req.params
            const book = await Book.findOne({_id:id})
            const { newPrices } = req.body
            if(!book) {return res.status(400).send("livro nao existe")}
            book.prices = newPrices 
            await book.save() 
            return res.status(200).send(book)    
            
        }catch(err){
            return res.status(500).send({error:"erro ao atualizar"})
        }
    },
    async deleteBook (req,res){
        try{
            const {id} = req.params
            const book = await Book.findOne({_id:id})
            if(!book) {return res.status(400).send("livro nao existe")}
            await book.remove({id})
            return res.status(200).send( 'deletado')

    }catch(err){
        res.status(400).send({error:'Erro ao buscar dados ' +err})
        }
    },
    async addUsers(req,res){
        try{
            const { id } = req.params
            const { userName } = req.body
            const book = await Book.findOne({_id:id})
            if(!user) return res.status(400).send('livro nao existe')
            const user = await User.findOne({name: userName}) 
            if(!user) return res.status(400).send('usuario nao existe')
            const userId = user.id
            book.users.push(userId)
            await book.save()
            // book.userId id
            // await book.save()
            return res.status(200).send(book)
        }catch(err){
            return res.status(500).send('erro ao atualizar')
        }
    }
    

}