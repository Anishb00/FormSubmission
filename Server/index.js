const express = require ('express');
const app = express();
const PORT = 3000;
const multer = require('multer');
const Tesseract = require('tesseract.js');
const fs = require('fs');
// app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './FormTemplates')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage }).single('file');

app.use(express.static(__dirname +'/../Client/dist'));

app.get('/', (req,res) => {
    res.end('hello world');
})


app.post('/formtemplate', (req, res) => {
    // req.file is the `avatar` file

    // req.body will hold the text fields, if there were any
    upload(req,res, err => {
        console.log(req.file);
        Tesseract.recognize(
            `./FormTemplates/${req.file.originalname}`,
            'eng',
            { logger: m => console.log(m) }
          ).then(({ data: { text } }) => {
            // console.log(data);
            res.send(text);
          })
          .catch(e => console.log(e));
    })





    
})

app.listen(PORT, () => console.log('Listening on port 3000'));