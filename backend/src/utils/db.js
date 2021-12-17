const mysql = require("mysql")
const { param } = require("../router/home")
const db = mysql.createConnection({

    host:"127.0.0.1",
    port:'3306',
    database:'interface',
    user:'root',
    password:'12345678'
})
db.connect()

module.exports = (sql,param) =>{
    return new Promise((resolve,reject) => {
        db.query(sql,param,(err,data)=>{
            if(err) {
                console.log(err)
                reject(err)
                
            }else{
                resolve(data)
                console.log(JSON.stringify(data))
            }
        })
    })
}