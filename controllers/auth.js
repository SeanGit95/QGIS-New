const mySql = require("mysql");
const jwt = require('jsonwebtoken')
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

    const {userName, firstName, lastName, email, password, confPassword, mobileNum} = req.body; //get data from form

    if(userName == '' || firstName == '' || lastName == '' || email == '' || password == '' || confPassword == '' || mobileNum == '')
    {
        return res.render('register',{
            message: 'please fill all form'
        })
    }
    else{

    //check form data agaist it self and against db
    db.query("SELECT userEmail FROM users where userEmail = ?",[email], async (error, results) =>{ //check that there isnt same email in use
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('register',{
                message: 'that email all ready in use'
            })
        }
        else if(password !== confPassword){
            return res.render('register',{
                message: 'password and password confrim not the same'
              })
        }

        db.query("SELECT userName FROM users where userName = ?",[userName], async (error, results) =>{ //check that there isnt same userName in use
            if(error){
                console.log(error);
            }
    
            if(results.length > 0){
                return res.render('register',{
                    message: 'that user name all ready in use'
                })
            }

            let hashedPassword = await bcrypt.hash(password , 8); //crypt password
            console.log (hashedPassword);

            db.query('INSERT INTO users SET ? ',{userName : userName, userFirstName : firstName, userLastName : lastName ,userEmail : email, Password: hashedPassword, userMobileNum: mobileNum}, (error,results) =>{
               if(error){
                   console.log(error);
               } 
               return res.render('register',{
                message: 'user registerd'
              })
            })
        });
    });
}
}

exports.login = async (req,res) =>{
    try{
        const {userName, password} = req.body;

        if( !userName || !password ){
            console.log('missing');
            return res.status(400).render('login',{
                message: 'please provide user name and password'
            }
            )}
        db.query('SELECT * FROM users WHERE userName = ?',[userName], async(error,results)=>{
            if( !results || !(await  bcrypt.compare(password, results[0].Password))){
                console.log("cantlogin");
                res.status(401).render('login', {
                    message :'email or password is incorrect'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id : id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPPIRES_IN
                });

                console.log("the token is: " + token);

                const cookieOptions = {
                    expiers : new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000 //switch to msec
                    ),
                    httpOnly: true
                }
                
                res.cookie('jwt', token, cookieOptions );
                res.status(200).redirect('/gis');
            }
        })

    }catch (error) {
        console.log(error)
    }

}