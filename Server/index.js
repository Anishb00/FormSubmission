const express = require ('express');
const app = express();
const PORT = 3000;


app.use(express.json());

app.use(express.static(__dirname +'/../Client/dist'));

app.get('/', (req,res) => {
    res.end('hello world');
})

app.post('/formtemplate',(req, res) => {
    console.log(req.body)
    res.end();
})

app.listen(PORT, () => console.log('Listening on port 3000'));