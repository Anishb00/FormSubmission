const express = require ('express');
const app = express();
const PORT = 3000;
const multer = require('multer');
var Promise = require("bluebird");
const Vision = require('@google-cloud/vision');
const client = new Vision.ImageAnnotatorClient({
    keyFilename: 'API_key.json'
});
app.use(express.json());

const templatestorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './FormTemplates')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const applicantstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Applicants')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})


app.use(express.static(__dirname +'/../Client/dist'));

app.get('/', (req,res) => {
    res.end('hello world');
})



var upload = multer({ storage: templatestorage }).array('images',15);


app.post('/formtemplate',(req, res) => {
    // req.file is the `avatar` file
    upload(req,res, err => {
        if(err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.end();

        }
    })
    // req.body will hold the text fields, if there were any
})

var applicant = multer({ storage: applicantstorage }).array('images',15);

app.post('/formapplication',(req, res) => {
    // req.file is the `avatar` file
    console.log('the endpoint is correct');
    applicant(req,res, err => {
        if(err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            // iterate over the request files
            for(var i = 0; i < req.files.length; i++) {
                //get the text from both the files

                var templatepath = './FormTemplates/' + req.files[i].filename;


                var applicantpath = './Applicants/' + req.files[i].filename;
                var template = gettext(templatepath);
                var applicant = gettext(applicantpath);

                console.log('this is the text of the template', template);
                console.log('this is the text of the template', applicant);
                //iterate over template and if you have a word who dosent exist there then add it to the banks
            }


        }
    })
})




var gettext = (filepath) => {
    client
    .textDetection(filepath)
    .then(results => {
        console.log(results[0].fullTextAnnotation.text);
        return results[0].fullTextAnnotation.text
    })
    .catch(e => console.log(e));
}


app.listen(PORT, () => console.log('Listening on port 3000'));

// app.post('/formtemplate',upload.single('avatar'), function (req, res, next) {
//     console.log(req.file);
//     req.file is the `avatar` file
//     console.log('here');
//     console.log(req.file);
//     req.body will hold the text fields, if there were any
//     upload(req,res, err => {
//         console.log(req.file);

//         client
//         .textDetection('./FormTemplates/Form.jpg')
//         .then(results => {
//             console.log(results[0].fullTextAnnotation.text);
//             // const labels = results[0].labelAnnotations;


//             // console.log('Labels:');
//             // labels.forEach(label => console.log(label.description));
//         })
//         .catch(e => console.log(e));
//     })

// })




//Text  Translation

// for(var i = 0; i < req.files.length; i++) {
//     var path = req.files[i].path
//     client
//     .textDetection(path)
//     .then(results => {
//         console.log(results[0].fullTextAnnotation.text);
//         // const labels = results[0].labelAnnotations;


//         // console.log('Labels:');
//         // labels.forEach(label => console.log(label.description));
//     })
//     .catch(e => console.log(e));
// }