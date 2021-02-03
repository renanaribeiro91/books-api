const express = require('express')
const routes = express.Router()

const controller = require('../controller/user')



routes.get('/all',controller.findAll)

routes.get('/:id',controller.findOneUser)

routes.post('/create',controller.createUser) 

routes.post('/auth',controller.authUser )

routes.delete('/:id', controller.deleteUser)

routes.put('/update/:id',controller.updateUser) 

module.exports = routes