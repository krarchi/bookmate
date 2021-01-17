const express = require('express')

var app = express();



app.listen(process.env.PORT || 3000 , function (){
    console.log('Listening on 3000');
})
