const express = require('express');
const app = express();

app.post('/users',(req,res)=>{
    res.sendStatus(200);
});

module.exports={
    app
};