const express = require("express");
const path = require('path');
const mySql = require("mysql");
const dotEnv = require('dotenv');

dotEnv.config({path: './.env'});
const { request, response } = require("express");

const app = express();

const db=  mySql.createConnection({
	host     : process.env.DATABAST_HOST,
	user     : process.env.DATABASEUSER,
	password : process.env.DATABASEPASSWORD,
	database : process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'hbs');

db.connect ( (error) => {
    if(error)
    {
        console.log(error);
    }
    else 
    {
        console.log("mySql connected");
    }
});

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'))

app.listen(3001, () =>{
    console.log("server started on poert 3001");
});
