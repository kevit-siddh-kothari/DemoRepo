const express = require('express');
const app1 = express();
const {app} = require('./app');

function sum(a, b) {
    return a + b;
};

function myFunction(val) {
    if(val==='Invalid'){
        throw new Error(`Fucked up`);
    };
};

function fetchData(cb){
    setTimeout(() => {
        cb(`Hello world`);
    }, 9000);
};

function fetchPromise(){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(`Hello World!`);
        }, 3000);
    });
};


app1.listen(3000,()=>console.log('server started sucessfully!!'));

module.exports = {
    sum,myFunction,fetchData,fetchPromise
};