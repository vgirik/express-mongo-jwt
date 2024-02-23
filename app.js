const express = require('express');
const app=express();
const port = 4040;
//
const mongoose = require('mongoose');
//
const bodyParser = require('body-parser');
//
const router = require('./router/router');
//
const auth = require('./middleware/authentication');
//
const env = require('dotenv');
//
env.config();
//
app.use(bodyParser.json());  
//
app.use(auth.validToken());

app.get("/",
(req,resp) =>{
    
    resp.send("Hellow World!!")
});

//Express Routing middleware 
app.use("/user",router);
// Connection with MongoDB
mongoose.connect(`mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_SERVER}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`)
.then(()=>{
    console.log('Mongdb Connected Successfully');   
})
.catch((error) =>{
    console.log(`${error}`);
});


app.listen(process.env.SERVER_PORT, () => {
    console.log(`User Service listening on port ${port}`)
    console.log(`Developer: ${process.env.DEVELOPER_NAME} `);
});
