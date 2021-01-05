const express = require ('express');
const app = express();
const PORT = 3000;
const multer = require('multer');
const Promise = require("bluebird");
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
                var template;
                var applicant;
                gettext(templatepath)
                .then((data) => {
                    data = data.replace(/\n/g, ' ')
                    template = data.split(' ');
                    return template;
                })
                .catch(e => console.log(e))
                gettext(applicantpath)
                .then((data) => {
                    console.log(data, 'DATAAAAA');
                    var string = data.replace(/\n/g, ' ')
                    console.log(string, "STRIIINNNNGGG");
                    applicant = string.split(' ');
                    return applicant;
                })
                .catch(e => console.log(e))
                .then(() => {
                    // console.log(applicant);
                    // console.log(template);
                    var result = [];
                    for(var i = 0; i < applicant.length; i++) {
                        if(template.indexOf(applicant[i]) === -1) {
                            result.push(applicant[i]);
                        }
                    }
                    console.log(result);
                })


                //iterate over template and if you have a word who dosent exist there then add it to the banks
            }


        }
    })
})




var gettext = (filepath) => {
    var promise = new Promise (
        function (resolve, reject) {
            client
            .textDetection(filepath)
            .then(results => {
            // console.log(results[0].fullTextAnnotation.text);
            resolve(results[0].fullTextAnnotation.text)
            })
            .catch(e => reject(e));
        }
    )
    return promise

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