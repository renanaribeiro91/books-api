const express = require('express');
const app = express();
const bodyParser = require('body-parser')


require('./src/database/mongoose')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const userRoutes = require('./src/router/routesUser')
const bookRoutes = require('./src/router/routesBook')
const indexRoutes = require('./src/router/index')


app.use(indexRoutes)
app.use('/user',userRoutes)
app.use('/books',bookRoutes)


const port = 3000 || process.env.port 
app.listen(port, () =>{
    console.log('Server esta on na porta 3000')
});

module.exports = app;