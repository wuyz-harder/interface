<template>
<div id="full">

<div class="fm">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
    <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button id="but" @click="login">登录</el-button>
    </el-form-item>
    </el-form> 
</div>
</div>
</template>

<script>
import {post} from "../api/index"
export default {
    data(){
        return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          password: ''
        }
    }
    },
    methods:{
        login(){
            post("http://localhost:8888/login",{"user_name":this.formLabelAlign.name,"password":this.formLabelAlign.password}).then(
                data=>{
                    
                    
                    if(data.data.code !=200){
                        throw Error
                    }else{
                        sessionStorage.setItem("user",this.formLabelAlign.name)
                        sessionStorage.setItem("token",data.data.token)
                        this.$message({
                            type:"success",
                            message:"登录成功"
                        })
                        this.$router.push("/project")
                    }
                }
            ).catch(err=>{
                console.log(err)
                this.$message.error("登录出错，请稍后再试");
            })
        }
    }
}
</script>

<style scoped>


#full{
    height: 100%;
    width: 100%;
    background-color: #c1aed3;
    position:fixed;
}
#but{
    color: aliceblue !important;
    background: #409eff !important;
    width: 100%;
    height: 40px;
}

.fm{
    height: 300px;
    width: 330px;
    position: absolute;
    background-color: #ffffff9e;
    top:35%;
    left: 35%;
    display: flex;
    justify-items: center;
    align-items:center;
    transform: translateX(-165px);
    transform: translateY(-150px);
}
.el-form{
    display: block;
}
</style>