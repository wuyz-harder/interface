<template>
<!-- 要使用该测试工具需要装好Vue 2.0，elementui，教程较为简单，请百度一下-->
<!-- 或者找部门内的前端工程师帮忙跑一下 -->
<div class="ws">
    <h1>websocket测试</h1>
    <div class="connect">
        <el-input v-model="websocket_address" ></el-input>
        <el-button type="primary" @click="connect()" >确认连接</el-button>
        <el-button type="danger" @click="wsDestroy()">断开</el-button>
    </div>
    <div>
        <div class="request"> 
            <el-input
                    type="textarea"
                    placeholder="请输入请求"
                    v-model="request_message"
                    :autosize="{ minRows: 5, maxRows: 10}"
                    >
            </el-input>
             <el-button type="success" @click="sendMessage()">发出请求</el-button>
        </div>
        <div class="response"> 
            <el-input
                    type="textarea"
                    placeholder="响应结果"
                    v-model="response_Data"
                    :autosize="{ minRows: 5, maxRows: 10}"
                    style="width:100%"
                    >
            </el-input>
             <el-button type="success">响应结果</el-button>
        </div>
    </div>
    <div class="fb">
        <a href="javascript:;" class="file" style="margin-bottom:0">选择json文件
            <input type="file" name="" id="upload_file" accept=".json" @change="change()" style="margin-left:50px">
        </a>
        <a download="模板.json" href="/template.json">模板下载</a>
        <br>
        <el-button type="success"  style="display:inline-block;margin-bottom:0" @click="start_many()">开启批量</el-button>
         <el-button type="success"  style="display:inline-block;margin-bottom:0" @click="save()">保存数据到文件</el-button>
        <br>
        完成进度：<p style="display:inline-block" id="per">{{ percentage }}%</p>
    </div>
    <table>
        <thead>
        <tr>
            <th style="width:7%">
                序号
            </th>
            <th style="width:10%">
                案例标题
            </th>
            <th>
                请求参数
            </th>
            
            <th>
                预期结果
            </th>
            <th>
                响应
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in json_data" :key="item.index">
            <td style="width:7%">
                {{ index + 1 }}
            </td>
            <td style="width:10%">
                {{ item.title }}
            </td>
             <td >
                <pre>{{ item.request }}</pre>
            </td>
             <td >
                <pre>{{ item.expect }}</pre>
            </td>
           
             <td>
                    <div v-if="item.response">
                        <pre>{{ item.response }}</pre>
                    </div>
                 <div v-else>
                     等待响应结果....
                 </div>
            </td>
        </tr>
        </tbody>
    </table>

</div>
</template>
<script>
import Vue from 'vue'

export default {
    data() {
      return { 
        first:true,
        client_uuid:"",
        result:'',    
        percentage:0,
        //websocket地址
        websocket_address:'ws://localhost:8888/websocket',
        //请求信息
        request_message:'',
        //请求数据
        response_Data:'',
        //请求数据
        json_data:[],
        //请求的ws
        ws:'',
        websocket:'',
        // 记录是否单次请求还是批量测试
        single:true,
        // 记录数量
        count:0,
        file_reader:""
      };
    },
    destroyed(){
        // 减少内存泄漏
            this.file_reader = ""
            this.ws = ""
    },
  
    methods: {
        save(){       
        }, 
    
        start_many(){
            this.single = false
            if(this.websocket==''){
                this.$message({type:'error',message:"请连接websocket再操作"})
                return
            }
                if(this.json_data.length==0){
                   
                    this.$message({type:"error",message:"请传入数据再开始"})
                    return
                }
                for(let i =0;i<this.json_data.length;i++){
                    this.websocket.send(JSON.stringify(this.json_data[i]['request']))
                }
                
        },
        change(){
          this.count = 0
          // 获取上传文件的信息
          this.file_reader = document.getElementById('upload_file').files[0];
          if (this.file_reader) {
                            // 使用 FileReader 来读取文件
                            let reader = new FileReader()
                            // 读取纯文本文件,且编码格式为 utf-8
                            reader.readAsText(this.file_reader, 'UTF-8')
                            // 读取文件,会触发 onload 异步事件,可使用回调函数 来获取最终的值.
                            // 异步先保存this指向
                            var _that =this
                            reader.onload = function (e) {
                                let fileContent = e.target.result
                                try{
                                var json_data_load = JSON.parse(fileContent)
                                }catch(err){
                                    _that.$message({type:'error',message:'您传入的JSON数据不正确'})
                                }
                                for(var obj in json_data_load){
                                    // 给上传的文件信息增加一个response字段
                                    json_data_load[obj]['response'] = ''
                                    var temp_data = {}
                                    temp_data = json_data_load[obj]
                                    temp_data['title'] = obj
                                    _that.json_data.push(temp_data)
                                }
                                
                            }
                            
                        }
        },
        connect() {    
            
                if(this.websocket_address==''){
                    this.$message({type:"error",message:"连接地址为空，请检查"})
                    return
                }
                 if(!window.WebSocket){
                     this.$message({type:"error",message:"您的浏览器不支持websocket"})
                    return
                }
                this.ws  = this.websocket_address
                this.websocket = new WebSocket(this.ws)
                console.log(this.websocket)
                // ws连接建立时触发
                this.websocket.addEventListener('open', this.wsOpenHanler)
                // ws服务端给客户端推送消息
                this.websocket.addEventListener('message', this.wsMessageHanler)
                // ws通信发生错误时触发
                this.websocket.addEventListener('error', this.wsErrorHanler)
                // ws关闭时触发
                this.websocket.addEventListener('close', this.wsCloseHanler)
                // 检查ws连接状态,readyState值为0表示尚未连接，1表示建立连接，2正在关闭连接，3已经关闭或无法打开   
                
            },
      wsOpenHanler() {
          this.$message({type:"success",message:"连接成功！！" })
            },
      wsMessageHanler(e) {
          if(this.first){
                this.client_uuid = e.data
                this.first = false
          }
          console.log(this.client_uuid)
            // const redata = JSON.parse(e.data)
            // console.log(redata)
            if(this.single){ 
                this.response_Data = e.data
            }else{
                // 动态更新响应的内容
                Vue.set(this.json_data[this.count],'response',JSON.parse(e.data))
                //每收到一条就更新一条
                this.count = this.count + 1
                this.percentage = parseInt(this.count/this.json_data.length*100)
                // 加入收到的信息条数等于总的，就设置single为FALSE
                if(this.count == this.json_data.length){
                    this.single = true
                }
            }
        },
            /**
             * ws通信发生错误
             */
            wsErrorHanler(event) {
                this.websocket.close()
                this.$message({type:"error",message:"通信错误❌"})
                console.log(event, '通信发生错误')
                
            },
            /**
             * ws关闭
             */
            wsCloseHanler(event) {
                console.log(event, 'ws关闭') 
               
            },
            sendMessage(){
                this.response_Data='等待响应中.....'
                if(this.request_message==''){
                this.$message({type:"error",message:"请求体为空，请检查"})
                this.response_Data='响应结果'
                return
                }
                if(this.websocket==''){
                    this.$message({type:"error",message:"还未连接，请检查"})
                    this.response_Data='响应结果'
                    return
                }  
                this.websocket.send(JSON.stringify({
                    msg:this.request_message,
                    client_uuid:this.client_uuid
                }))
            },
            /**
             * 销毁ws
             */
            wsDestroy() {
                if (this.websocket !== null) {
                    this.websocket.removeEventListener('open', this.wsOpenHanler)
                    this.websocket.removeEventListener('message', this.wsMessageHanler)
                    this.websocket.removeEventListener('error', this.wsErrorHanler)
                    this.websocket.removeEventListener('close', this.wsCloseHanler)
                    this.websocket.close()
                    this.websocket = null
                    this.$message({type:"success",message:"您已断开连接"})
                }
            }
    }
}

</script>

<style scoped>
.ws{
    padding: 0 100px;
}
h1{
    margin-top: 15px;
    margin-left: 550px ;
    margin-bottom: 10px;
}
.connect{
    text-align: center;
    
}
.request{
    margin-left: 5px;
    width:50%;
    text-align: center;
    display: inline-block;
}
.response{
    margin-left: 50px;
     width:45%;
    display: inline-block;
    text-align: center;
    
}
.fb{
    margin: 20px auto;
    text-align: center;
}
.el-button{
    margin-top: 20px;
    margin-bottom: 30px;
    
}
a{
    text-decoration: none;
}
table{
        margin-top: 15px;
		border-collapse:collapse;
		table-layout:fixed;
		border-radius:5px;
		border:2px solid #70aefb ;
		background-color: #328ef4;
		color: #c7dafb;
        width: 100%;
        
		}
table td,th{
        word-wrap:break-word;
        word-break:break-all; 
		padding: 5px;
		width: 20%;
		text-align: center;
		border:1px solid #70aefb ;
		vertical-align:middle;
		font-size: 15px;
     }
     tbody>tr:hover{
         background-color: #6bb647;
     }
 .file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 30px;
  
    }
    .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    }
    .file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
    }
</style>