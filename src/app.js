const express = require('express');

const app = express();


// const port  = 3000;
// this will only match the get http method api call to /user
app.get("/user",(req,res)=>{
    res.send({fmane: "mahesh", lname:"bharti"})
})

// this will match all the http method api call to /test

app.use('/test',(req,res)=>{
    res.send("hello from the server!!!1 ")
})

// app.use('/hello/2',(req,res)=>{
//     res.send("jai sharee raamm")
// })


// app.use('/hello',(req,res)=>{
//     res.send("hello hellllllooo mahesh")
// })

// app.use('/',(req,res)=>{
//     res.send("hello mahesh bharti ")
// })

app.listen(3000, ()=>{
    console.log(`server is running on port: 3000`);
});