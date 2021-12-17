<template>
  <el-button @click="sendDataToServer" >给后台发送消息</el-button>
</template>

<script>
    export default {
        name: "WebSocket",
        data() {
            return {
                // ws是否启动
                wsIsRun: false,
                // 定义ws对象
                webSocket: null,
                // ws请求链接（类似于ws后台地址）
                ws: '',
                // ws定时器
                wsTimer: null,
            }
        },
        mounted() {
            
            this.wsInit()
        },
        methods: {
            sendDataToServer() {
                if(WebSocket in Window){
                    console.log("websocket")
                }
                if (this.webSocket.readyState === 1) {
                    this.webSocket.send('来自前端的数据')
                } else {
                    throw Error('服务未连接')
                }
            },
            /**
             * 初始化ws
             */
            wsInit() {
                 if(WebSocket in Window){
                    console.log("websocket")
                }
                console.log(1)
                const wsuri = 'ws://localhost:6666/ws'
                this.ws = wsuri
                if (this.wsIsRun) return
                // 销毁w
                // 初始化ws
                this.webSocket = new WebSocket(this.ws)
                console.log(this.webSocket)
                // ws连接建立时触发
                this.webSocket.addEventListener('open', this.wsOpenHanler)
                // ws服务端给客户端推送消息
                this.webSocket.addEventListener('message', this.wsMessageHanler)
                // ws通信发生错误时触发
                this.webSocket.addEventListener('error', this.wsErrorHanler)
                // ws关闭时触发
                this.webSocket.addEventListener('close', this.wsCloseHanler)
                // 检查ws连接状态,readyState值为0表示尚未连接，1表示建立连接，2正在关闭连接，3已经关闭或无法打开   
                 if (this.webSocket.readyState === 1) {
                        console.log("连接成功")
                        console.log(this.webSocket.readyState)
                    } else {
                        console.log('ws建立连接失败') 
                        var now = new Date(); 
                        var exitTime = now.getTime() + 5000; 
                        while (true) { 
                                    now = new Date(); 
                                    if (now.getTime() > exitTime) {
                                        return; 
                                    }
                        }
                         
                        
                        }
                console.log(this.webSocket.readyState) 
                        
                }
                
            },
            wsOpenHanler(event) {
                console.log('ws建立连接成功')
            },
            wsMessageHanler(e) {
                console.log('wsMessageHanler')
                console.log(e)
                //const redata = JSON.parse(e.data)
                //console.log(redata)
            },
            /**
             * ws通信发生错误
             */
            wsErrorHanler(event) {
                console.log(event, '通信发生错误')
                this.wsInit()
            },
            /**
             * ws关闭
             */
            wsCloseHanler(event) {
                console.log(event, 'ws关闭')
                this.wsInit()
            },
            /**
             * 销毁ws
             */
            wsDestroy() {
                if (this.webSocket !== null) {
                    this.webSocket.removeEventListener('open', this.wsOpenHanler)
                    this.webSocket.removeEventListener('message', this.wsMessageHanler)
                    this.webSocket.removeEventListener('error', this.wsErrorHanler)
                    this.webSocket.removeEventListener('close', this.wsCloseHanler)
                    this.webSocket.close()
                    this.webSocket = null
                    
                }
            },
        }
    
</script>

<style>

</style>