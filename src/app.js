const express = require('express');

const app = express();


const port  = 3000;

app.use('/test',(req,res)=>{
    res.send("hello from the server!!!1 ")
})

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
});