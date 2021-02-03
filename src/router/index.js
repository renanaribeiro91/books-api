const express = require("express")
const routes = express.Router()
const auth = require('../middlewares/auth')




routes.get('/',auth, (req,res)=>{
     res.send({Menssage: 'Seja bem vindo ',user:res.locals.auth_data})
})



module.exports = routes