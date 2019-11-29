const express = require('express');
const app = express();
const path = require('path');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile( __dirname + '/views/index.html')
});

app.listen(port, function(){
    console.log('Your node js server is running on localhost:' + port);
});