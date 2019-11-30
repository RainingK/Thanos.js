const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const AdmZip = require('adm-zip');
const downloadsFolder = require('downloads-folder');

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
	var files = fs.readdirSync(upload_directory);
	// console.log(files[0]);

	// var randomNumbers = []

    // Download the Uploads folder
    var zip = new AdmZip();
    zip.addLocalFolder(upload_directory)
    zip_file = zip.toBuffer()
    const downloadName = 'I Am Inevitable.zip';
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${downloadName}`);
    res.set('Content-Length', zip_file.length);
	// res.send(zip_file)
	// zip.writeZip(downloadsFolder() + '/I Am Inevitable.zip')
	

    // Deletes the files in the directory once everything is done.
    fs.readdir(upload_directory, (err, files) => {
        if (err) throw err;
        
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