const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');


const route = require('./routes/route');

const port = process.env.PORT||3000;

app.set("view engine","ejs");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

app.use(session({
   secret :uuidv4(),
    resave: false,
    saveUninitialized : true   
}));

app.use('/route',route);

//home route
app.get('/',(req,res) => {
    res.render('base',{title : "Login System"});
});

app.listen(port,()=>{
    console.log("Listening to the server on http://localhost:3000");
});