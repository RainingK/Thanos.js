const express = require('express');
const path = require('path');
const dragDrop = require('drag-drop')
const multer = require('multer');

const app = express();
const upload = multer();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile( __dirname + '/views/index.html')
});

// Maximum 20 Files Can Be Uploaded At A Time
app.post('/', upload.array('files', 20) ,function(req, res, next) {
    console.log(req.files);
    
    res.redirect('/')
})

app.listen(port, function(){
    console.log('Your node js server is running on localhost:' + port);
});