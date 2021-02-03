const express = require('express')
const routes = express.Router()

const controller = require('../controller/book')


routes.get('/all',controller.findAll) 

routes.get('/:id',controller.findOneBook)

routes.post('/create',controller.createBook)

routes.delete('/:name',controller.deleteBook)

routes.put('/update/:id',controller.updateBook)

module.exports = routes