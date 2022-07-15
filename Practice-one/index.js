// const http = require('http');
// const data = require('./data');
// http.createServer((req,resp) => {
//     resp.writeHead(200,{'Content-Type' : 'application/json'});
//     resp.write(JSON.stringify(data)); 
//     resp.end();
// }).listen(5000);

// const fs = require('fs');
// const input = process.argv;

// if(input[2] == "add"){
//     fs.writeFileSync(input[3],input[4]);
// }else if(input[2] == "remove"){
//     fs.unlinkSync(input[3])
// }else{
//     console.error('Invalid input');
// }

// const fs = require('fs');
// const path = require('path');
// const dirPath = path.join(__dirname,"files");
// const filepath = `${dirPath}/apple.txt`;

//Create file
// fs.writeFileSync(filepath,'This is file name');

// Read file
// fs.readFile(filepath,'utf8',(error,item) => {
//     console.log(item);
// });

//Update file
// fs.appendFile(filepath,' And Something other thimgs also...',(error) => {
//     if(!error){
//         console.log('Successfully updated');
//     }
// });

//Rename file

// fs.rename(filepath,`${dirPath}/abc.txt`,(error) => {
//     if(!error){
//         console.log('Successfully updated');
//     }
// });

// fs.unlinkSync(`${dirPath}/abc.txt`);

//.................................................................................
//Express js

// const express = require('express');
// const path = require('path');
// const publicPath = path.join(__dirname,'view');
// const app = express();

// app.set('view engine','ejs');

//Static method
// app.use(express.static(publicPath))

// app.get('',(req,resp) => {
//     resp.sendFile(`${publicPath}/index.html`)
// });
// app.get('/about',(req,resp) => {
//     resp.sendFile(`${publicPath}/about.html`)
// });
// app.get('/profile',(req,resp) => {
//     const user = {
//         name: 'Darshan',
//         email: 'test@gmail.com',
//         skills: ['php','js','node']
//     }
//     resp.render('profile',{user});
// });
// app.get('*',(req,resp) => {
//     resp.sendFile(`${publicPath}/404.html`)
// });

//Middleware
// const reqFilter = require('./middeware');
// // app.use(reqFilter);

// const route = express.Router();

// route.use(reqFilter);
// route.get('',(req,resp) => {
//     resp.send(`Home page`)
// });
// app.get('/about',(req,resp) => {
//     resp.send(`About page`)
// });
// app.use('/',route);

//MangoDB connect
// const dbConnect = require('./mongodb');

// const main = async () => {
//     let data = await dbConnect('users');
//     data = await data.find().toArray();
//     console.log(data);
// }
// main();

const express = require('express');
const multer = require('multer');
const { ObjectId } = require("mongodb");
require('./config');

const user = require('./user');

const app = express();
app.use(express.json());
app.post('/create', async (req,resp)=> {
    let data = new user(req.body);
    let result = await data.save();
    resp.send(result);
})

app.get('/list', async (req,resp)=> {
    let data = await user.find();
    resp.send(data);
});

app.delete('/delete/:id', async (req,resp)=> {
    let data = await user.deleteOne({_id:ObjectId(req.params)});

    resp.send(data);
});
app.put('/update/:id', async (req,resp)=> {
    let data = await user.updateOne({_id:ObjectId(req.params)},{
        $set:req.body
    });

    resp.send(data);
});
//Search API
app.get('/search/:key', async (req,resp)=>{
    let data = await user.find(
        {
            "$or":[
                {
                    "name" :{
                        $regex: req.params.key
                    }
                },
                {
                    "email" :{
                        $regex: req.params.key
                    }
                },
                {
                    "skill" :{
                        $regex: req.params.key
                    }
                }
            ]
        }
    );
    resp.send(data); 
});

//Upload file
// const upload = multer({
//     storage:multer.diskStorage({
//         destination:function(req,file,callback){
//             callback(null,'uploads');
//         },
//         filename:function(req,file,callback){
//             callback(null,file.fieldname+'_'+Date.now()+'.jpg');
//         }
//     })
// }).single("user_file");

// app.post('/upload',upload,(req,resp) => {
//     console.log('file uploaded');
// });

const os = require('os');
console.log(os.freemem()/(1024*1024*1024));



app.listen('4500');
