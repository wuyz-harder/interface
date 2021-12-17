<template>
<div>

     <el-menu 
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1"><router-link to="/project">项目汇总</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to="/interface">接口目录</router-link></el-menu-item>
        <el-menu-item index="3"><router-link to="/people">开发人员</router-link></el-menu-item>
        <el-menu-item index="4"><router-link to="/log">操作日志</router-link></el-menu-item>
        <el-menu-item index="5"><router-link to="/websocket">websocket自动化测试</router-link></el-menu-item>
        <el-menu-item style="float:right">
            欢迎你，{{user_name}}
            <el-button @click="logout" id="out">退出</el-button>
            </el-menu-item>
     </el-menu>
     <router-view></router-view>
</div>
 
</template>

<script>

export default {
  components: {  },
    name:"navigator",
    data(){
        return{
           ws:"",
            activeIndex:"1",
            user_name:"",
            first:true,
            client_uuid:"",
        }
    },
    mounted(){

            
            this.user_name = sessionStorage.getItem("user")?sessionStorage.getItem("user"):""
            this.ws = new WebSocket('ws://localhost:8888/websocket')
            this.ws.addEventListener('open', this.wsOpenHanler)
                // ws服务端给客户端推送消息
            this.ws.addEventListener('message', this.wsMessageHanler)
                // ws通信发生错误时触发
            this.ws.addEventListener('error', this.wsErrorHanler)
                // ws关闭时触发
            this.ws.addEventListener('close', this.wsCloseHanler)
    },
    methods:{
        wsOpenHanler() {
            },
       wsMessageHanler(e) {
          if(this.first){
            //   
                this.client_uuid = e.data
                sessionStorage.setItem("uuid",e.data)
                this.first = false
                this.ws.send(JSON.stringify({
                        user:sessionStorage.getItem("user"),
                        client_uuid : this.client_uuid,
                        type:"login"
                }))
                return
          }
          this.$message(
              {
                showClose:true,
              type:"success",
              dangerouslyUseHTMLString: true,
              message:"您收到一条新消息：" + e.data + "<a href='http://www.baidu.com' style='text-decoration:none'>  详情  </a>",
              duration:6000
          }
              )
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
        logout(){
            sessionStorage.removeItem("user")
            sessionStorage.setItem("token","")
            this.$router.push("/login")

        },
        handleSelect(key){
           console.log(key)
        }
    },
    destroyed(){
        if (this.ws !== "") {
                    this.ws.removeEventListener('open', this.wsOpenHanler)
                    this.ws.removeEventListener('message', this.wsMessageHanler)
                    this.ws.removeEventListener('error', this.wsErrorHanler)
                    this.ws.removeEventListener('close', this.wsCloseHanler)
                    this.ws.close()
                    this.ws = null
                }
    }
}
</script>

<style scoped>

.mian{
    position: relative;
    width: 100%;
    overflow:scroll;
}
.el-menu{
    position:sticky;
    top: 0;
    z-index: 999;
    overflow: scroll;
}

.el-menu-item{
   padding: 0 32px;
}

 a{
     text-decoration: none;
 }
.router-link-active {
  text-decoration: none;
}
.router-link-inactive {
  text-decoration: none;
}
#out{
    border: 0px !important;
    width: 20px;
    height: 25px;
    background:transparent !important;
    padding-top: 3px !important;
    padding-left: 8px !important;
    color: aliceblue !important;
}
search{
    display: inline-block;
}

</style>