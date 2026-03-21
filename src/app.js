const express = require('express');

const app = express();

const connectDB = require('./config/database');
const User = require('./models/user');

app.use(express.json())

// const {adminAuth, userAuth} = require('./middleware/auth')

app.get('/user',async (req,res)=>{
    const userEmail =  req.body.emailId;

    try{
        console.log(userEmail)
        const userData = await User.find({emailId: userEmail});
        if(userData.length === 0){
            res.status(404).send("user not found!!")
        }else{
        res.send(userData);
        }

    }catch(error){
        res.status(400).send("error occured"+ error.message);
    }

})

app.get('/feed',async (req,res)=>{

    try{
        const userList = await User.find({});
        if(!userList){
            res.status(404).send("user not found!!");
        }
        else{
            res.send(userList);
        }
    }catch(error){
        res.status(400).send("error occured"+ error.message);
    }
})

app.delete('/deleteUser',async (req,res)=>{
    const userId = req.body.userId;
    try{
        console.log(userId)
        const userList = await User.findByIdAndDelete(userId);
        if(!userList){
            res.status(404).send("user not found!!");
        }
        else{
            res.send("User deleted successfully");
        }
    }catch(error){
        res.status(400).send("error occured"+ error.message);
    }
})

app.patch('/update/:userId', async (req,res)=>{
    const userId = req.param?.userId;
    const data = req.body;

    try{
        const allowedUpdate = ["about", "photoURL", "gender", "age", "skill"];
        const isallowed = Object.keys(data).every((k)=>{allowedUpdate.includes(k)})
        if(!isallowed){
            res.send("update are not allowed")
        }
        if(data.skill.length > 10){
            throw new Error("skill can not be more than 10");
        }
        console.log(data)
        const userList = await User.findByIdAndUpdate(userId, data, {returmDocument: "after"});
        res.send("user updated successfully");
        console.log(userList)
    }catch(error){
        res.status(400).send("error occured"+ error.message);

    }
})


app.post('/signup',async (req,res)=>{
    // const userObj = {
    //     firstName: "himli",
    //     lastName: "bharti",
    //     emailId: "himli234@gmail.com",
    //     password: "himli123",
    //     age: 5
    // }

        const users = req.body;

        const userList = new User(users);
        try{
            await userList.save();
            res.send("users added successfully!!!")
        }catch(error){
            res.status(400).send("error occured"+ error.message);
        }

// creatig a new instance to the user model
    // const user = new User(userObj)
    // try {
    //     await user.save();
    //     res.send("user added successfully!!!")
    // }catch (err){
    //     res.status(400).send("error occured"+ err.message)
    // }
})





connectDB().then(()=>{
    console.log("database conncted successfully!!!");
    app.listen(7777, ()=>{
        console.log(`server is running on port: 7777...`);
    });
}).catch((error) => {
    console.log("database not conncted successfully!!")
})


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

// app.use('/admin',adminAuth);
// // app.use('/admin',userAuth);

// app.get('/admin/getUserData',(req,res)=>{
//         res.send("sent user admin")
// })


// app.get('/admin/deleteUserData',(req,res)=>{
//             res.send("delete user admin")
//     })

// app.get('/user',userAuth,(req,res)=>{
//         res.send("sent user data")
// })







// error handing middleware

// app.get('/getUserData',(req,res)=>{

//     throw new Error("gghjghaheghj")
//     res.send("getting user admin")
// })

// app.use('/',(error,req,res,next)=>{
//     res.status(500).send("Something went wrong!!!")
// })

