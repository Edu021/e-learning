const express = require('express');
const app = express();
const crud = require('./server/database/crud');
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// ROUTES

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/client/register.html');
});

app.get('/courses', (req, res) => {
    res.sendFile(__dirname + '/client/courses.html');
});

// API ROUTES 

// REGISTRA USUÁRIO
app.post('/api/register_user', (req, res) => {
    const table = 'users';
    const data = {username: req.body.name, password: req.body.password, email: req.body.email};
    const fields = ['username','email'];
    const filter = `username = "${req.body.name}" or email = "${req.body.email}"`;
    crud.readFilter(table, fields, filter, (error, results) => {
        if (error) {
            console.log(error);
        } else if(results.length) {
            console.log('username or email already in use');
        } else {
            crud.create(data, table, (err, res) => {
                if (err) console.error(err);
                if (!err) console.log(res);
            });
        }
    });
});

// RUN

app.listen(3000, () => {
    console.log('Server started on port 3000');
});