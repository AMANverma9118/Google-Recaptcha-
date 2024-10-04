require("dotenv").config();

const express=require("express");
const rateLimit = require('express-rate-limit');
// console.log("hello")
const app=express();



const limiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 8 requests per windowMs
    message: 'Register krle, ye main sikha dunga'
  });

  
  // Apply to all requests
app.use(limiter);
const appRoute = require('./routes/user.routes.js');
const bodyParser = require('body-parser');

const cors = require('cors');

app.use(cors());



const port = process.env.PORT ||3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.json());

const connectDB = require('./db/connect.db.js');

connectDB()



app.use('/',appRoute);

app.get('/',(req,res)=>{
    res.send('Hello everyone, Your name');
})

app.listen(port,()=>{
    console.log(`Server is runing on http://localhost:${port}`) 
})