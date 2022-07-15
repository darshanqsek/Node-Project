const express = require('express');
const route = express.Router();

const credential = {
    email : "admin@gmail.com",
    password : 'admin@1234'
}

//login User
route.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('dashboard');
    }else{
        res.render('/base',{title:'Wrong username', error: 'User and password are wrong'});
    }
});
route.get('/dashboard',(req,res)=>{
   if(req.session.user){
        res.render('dashboard',{user:req.session.user});
   }else{
        res.render('base');
   }
});
route.get('/logout',(req,res)=>{
   req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send('ERROR');
        }else{
            res.redirect('/');
        }
   });
 });

module.exports = route;