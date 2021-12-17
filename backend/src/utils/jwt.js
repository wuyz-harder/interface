var jwt = require("jsonwebtoken")
const jwtSecret = '110futurenodemongodbvue'

module.exports.genToken = (username,pw)=>{
    return jwt.sign({username:username},jwtSecret,{expiresIn:'24h'})
}

module.exports.vertifyToken = token =>{
    console.log(token)
    return new Promise((resolve,reject) => {
             jwt.verify(token,jwtSecret,(error,decoded)=>{
                if(error){
                    reject(false)
                }else{
                    resolve(true)
                }
            })
            
    })
}