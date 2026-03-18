const adminAuth = (req,res,next)=>{
        console.log(" authorzation middleware checked!!")
        const token = 'xyz'
        const isUserAuthorizes = token === 'xyz'
    
        if(!isUserAuthorizes){
            res.status(401).send("unauthorized user");
        }
        else{
            next();
        }
    }

    const userAuth = (req,res,next)=>{
        console.log(" authorzation middleware checked!!")
        const token = 'xyz'
        const isUserAuthorizes = token === 'xyz'
    
        if(!isUserAuthorizes){
            res.status(401).send("unauthorized user");
        }
        else{
            next();
        }
    }

module.exports = {
    adminAuth,
    userAuth,
}