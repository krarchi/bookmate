const express = require('express')
const user_routes = require('./routes/user_routes')

var app = express();

app.use(express.json())

app.use('/user', user_routes)

app.listen(process.env.PORT || 3000 , function (){
    console.log('Listening on 3000');
})
