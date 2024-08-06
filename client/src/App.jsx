import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client'

const App = () =>{
  const socket = io('http://localhost:3000/');

  const handleSubmit = (e) =>{
    e.preventDefault();
    socket.emit('message','message');

  }
  useEffect(()=>{
    socket.on('connect',()=>{
      console.log('connected!',socket.id);
    })
    socket.on('welcome', (message)=>{
      socket.emit('mess', 'hello');
      console.log(message);
    })
    
  },[])

  return <Container maxWidth='sm'>
    <Typography variant='h1' component='div' gutterBottom>
      Welcome to Chat App
    </Typography>

  <form>
    <TextField id='outlined-basic' label='Outlined' variant='outlined' value={message} onChange={e=>setMessage(e.target.value)}/>
    <Button variant='contained' color='primary'>send</Button>
  </form>

  </Container>
}

export default App;