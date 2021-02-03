const jwt = require('jsonwebtoken')

const auth = (req,res,next) =>{
    const token_header = req.headers.auth;
    if(!token_header) return res.status(401).send({error: 'token não enviado'})

    jwt.verify(token_header,'churumel',(err,decoded)=>{  // verificar se o token é valido , senha 
        if(err) return res.status(401).send({error: 'Token inválido'})
        res.locals.auth_data = decoded; // salvar o id
        return next();
    })
}

module.exports = auth;