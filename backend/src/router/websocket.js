const express = require("express")
const router = express.Router()
var expressWs = require('express-ws');
const clients = []
expressWs(router)
router.ws("/",(ws,req)=>{
    var client_uuid = new Date().getTime()
    clients.push({
        ws:ws,
        client_uuid:client_uuid,
        user:""
    })
    ws.send(client_uuid.toString())
    ws.on("open",()=>{
        ws.send(JSON.stringify({
            ws:ws,
            client_id:client_uuid
        }))
    })
    ws.on("message",msg=>{
        var msg = JSON.parse(msg)
        if(msg.type == "login"){
            clients.forEach((item,index)=>{
                if(item.client_uuid == msg.client_uuid){
                    
                    clients[index].user = msg.user
                }
            })
            return
        }
        clients.forEach(item=>{
            if(item.client_uuid == msg.client_uuid){
                item.ws.send("你给我发信息了是吗" + item.client_uuid)
                // item.ws.send(JSON.stringify(msg))
            }

        })
    })
})
module.exports = [router,clients]