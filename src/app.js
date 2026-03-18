const express = require('express');

const app = express();

const {adminAuth, userAuth} = require('./middleware/auth')


// const port  = 3000;
// this will only match the get http method api call to /user
// app.get("/user",(req,res)=>{
//     res.send({fmane: "mahesh", lname:"bharti"})
// })

// this will match all the http method api call to /test

// app.use('/test',(req,res)=>{
//     res.send("hello from the server!!!1 ")
// })

// app.get('/test',(req,res)=>{
//     res.send("hello from the server!!!1 ")
// })

// app.use('/hello',(req,res,next)=>{
//     // res.send("jai sharee raamm") // it will run infinite time and will not give response bcz we are not sending response
//     console.log("jai shree ram 1");
//     next();
// },
// (req,res)=>{
//     res.send("jai sharee raamm2")
// },
// (req,res)=>{
//     res.send("jai sharee raamm")
// },
// (req,res)=>{
//     res.send("jai sharee raamm")
// })


// app.use('/hello',(req,res)=>{
//     res.send("hello hellllllooo mahesh")
// })

// app.use('/',(req,res)=>{
//     res.send("hello mahesh bharti ")
// })


//====================================

// use case of middleware -> authorization
// complex code ===> not easy to understand

// app.get('/admin/getUserData',(req,res)=>{
//     // authorization logic
//     const token = 'xyzhegdgcdchdhd'

//     const isUserAuthorizes = token === 'xyz'

//     if(isUserAuthorizes){
//         console.log("user admin");
//         res.send("user admin")
//     }
//     else{
//         res.status(400).send("Unauthorized user!!!!")
//     }
// })

// app.get('/admin/deleteUserData',(req,res)=>{
//     const token = 'xyzhegdgcdchdhd'

//     const isUserAuthorizes = token === 'xyz'

//     if(isUserAuthorizes){
//         console.log("user admin user authorized");
//         res.send("delete user admin")
//     }
//     else{
//         res.status(400).send("Unauthorized user!!!!")
//     }
// })



// app.use('/admin',(req,res,next)=>{
//     console.log(" authorzation middleware checked!!")
//     const token = 'xyz'
//     const isUserAuthorizes = token === 'xyz'

//     if(!isUserAuthorizes){
//         res.status(401).send("unauthorized user");
//     }
//     else{
//         next();
//     }
// })

app.use('/admin',adminAuth);
// app.use('/admin',userAuth);

app.get('/admin/getUserData',(req,res)=>{
        res.send("sent user admin")
})


app.get('/admin/deleteUserData',(req,res)=>{
            res.send("delete user admin")
    })

app.get('/user',userAuth,(req,res)=>{
        res.send("sent user data")
})







// error handing middleware

// app.get('/getUserData',(req,res)=>{

//     throw new Error("gghjghaheghj")
//     res.send("getting user admin")
// })

// app.use('/',(error,req,res,next)=>{
//     res.status(500).send("Something went wrong!!!")
// })

// app.listen(3000, ()=>{
//     console.log(`server is running on port: 3000`);
// });