const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const upload_directory = __dirname + '\\uploads';

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendFile( __dirname + '/views/index.html')
});

// Maximum 20 Files Can Be Uploaded At A Time
app.post('/', upload.array('files', 20) ,function(req, res, next) {
    file_array = req.files
    console.log(file_array);

    // Deletes the files in the directory once everything is done.
    fs.readdir(upload_directory, (err, files) => {
        if (err) throw err;
        console.log(upload_directory);
        for (const file of files) {
          fs.unlink(path.join(upload_directory, file), err => {
            if (err) throw err;
          });
        }
    });

    res.redirect('/')
})

app.listen(port, function(){
    console.log('Your node js server is running on localhost:' + port);
});