const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/DESAFIO'
const options = {useNewUrlParser:true,useUnifiedTopology: true}

mongoose.Promise = global.Promise;
mongoose.connect(url,options),(err) => {
    if(err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    }else {
        console.log('Connected to Server successfully!');
    }
};

module.exports = mongoose

