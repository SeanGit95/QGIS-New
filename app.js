const express = require("express");
const path = require('path');
const mySql = require("mysql");
const dotEnv = require('dotenv');
const cookieParser = require('cookie-parser');
const fs = require('fs');

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
app.use(cookieParser());

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
app.use('/auth', require('./routes/auth'));
app.use(express.static(__dirname+ '/gis'));

app.get('/roi', function(req, res) {
    res.sendFile(path.join(__dirname + '/gis/gisWithSearch.html'));
   // res.writeHead(200,{'Content-Type': 'text/html'});
    //fs.readFile('./gis/index.html', null, function(error,data) {
      //  res.write(data);
        
    //})
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + '/gis/index.html'));
});

app.get('/afterlogin', function(req, res) {
    res.sendFile(path.join(__dirname + '/gis/gisWithSearch.html'));
});

app.listen(3001, () =>{
    console.log("server started on poert 3001");
});