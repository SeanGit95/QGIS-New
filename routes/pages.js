const express = require("express");

const router =express.Router();


router.get('/', (req,res) =>{
    res.redirect('home');
});

router.get('/register', (req,res) =>{
    res.render('register');
});

router.get('/login', (req,res) =>{
    res.render('login');
});

    router.get('/logout', (req,res) =>{
    req.logout();
    req.session.destroy();
    res.redirect("/");
});

router.get('/gis', (req,res) =>{
    res.redirect('afterlogin');
});

module.exports = router;