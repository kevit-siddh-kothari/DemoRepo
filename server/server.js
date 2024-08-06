// const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');

const server = http.createServer(app);;

const io = new Server(server, {
    cors:{
        origin:'http://localhost:5173',  //   '*' for all origins
        methods:['GET','POST'],
        credentials:true
    }
});

io.on('connection', (socket)=>{
    console.log('user connected!', ' ID - ',socket.id);
    io.emit('welcome', `${socket.id} has connected sucessfully`);//when we reload the message doesnot goes to the all the connected pages exrpt the current one!
    socket.on('disconnect', ()=>{
        io.emit('welcome',`${socket.id} got disconnected!`);
    });
    socket.on('mess', (message)=>{
        io.emit('welcome',message);
    });
    const count = io.engine.clientsCount;
    console.log(count);
});

app.get('/',(req,res)=>{
    res.send('Hello world');
});

server.listen(3000,()=>{
    console.log(`server running on port 3000`);
});