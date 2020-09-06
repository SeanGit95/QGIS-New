const mySql = require("mysql");
const jwt =require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const db=  mySql.createConnection({
	host     : process.env.DATABAST_HOST,
	user     : process.env.DATABASEUSER,
	password : process.env.DATABASEPASSWORD,
	database : process.env.DATABASE
});

db.query

exports.register = (req,res) =>{
    console.log(req.body);

    const {userName, email, password, confPassword} = req.body;

    //check form data agaist it self and against db
    db.query("SELECT userEmail FROM users where userEmail = ?",[email], (error, results) =>{
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('register',{
                messege: 'that email all ready in use'
            })
        }else if(password !== confPassword){
            return res.render('register',{
             messege: 'password and password confrim not the same'
              })
            }
    });
    db.query("SELECT userName FROM users where userName = ?",[userName], (error, results) =>{
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('register',{
                messege: 'user name all ready taken'
            })
        }
    });
    res.send("form submited")
}