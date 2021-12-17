<template>
  <div class="addpeople">
    <div class="addcontent">
      <div>
          <span>项目名<span style="color:red">*</span></span><el-input v-model="project_name">{{project_name}}</el-input>
      </div>
      <div>
        <span>接口数量<span style="color:red">*</span></span><el-input  v-model="interface_number">{{interface_number}}</el-input>
      </div>
      <div>
        <span>描述</span><el-input v-model="description">{{description}}</el-input>
      </div>
    <div class="btn">
       <el-button type="danger" @click="cancel">取消</el-button>
      <el-button type="success" @click="addproject">提交</el-button>
    </div>
    </div>
   
  </div>
</template>

<script>
import {post} from "../../api/index"
import {getNowTime} from "../../assets/getNowTime"
export default {
  methods:{
      cancel(){
        this.$emit("cancel")
      },
      addproject(){
        if(this.project_name == ""){
          this.$message.error("请输入项目名字")
          return
        }
       post("http://localhost:8888/home/add_project",{
         "project_name":this.project_name,
         "interface_number":this.interface_number,
         "description":this.description,
         "maker":sessionStorage.getItem("user")
         }).then(data=>{
           if(data.data.code == 200){
              //  通知父亲关闭覆盖框
             this.$emit("cancel")
            //  刷新页面
             
             this.$message({
               type:"success",
               message:"新增项目成功"
             })
              post("http://localhost:8888/log/add_log",{
            "detail":"增加项目:" + this.project_name,
            "user_name":sessionStorage.getItem("user"),
            "time":getNowTime()
            })
            history.go(0)
          }
           else{
             this.$emit("cancel")
             throw Error("error")
           }
         }).catch(err=>{
           this.$message.error(err)
           this.$emit("cancel")
         })
      }
  },
  data(){
    return {
      interface_number:0,
      project_name:"",
      description:"",
      timeid :""
    }
  }

}
</script>

<style scoped>


.addcontent{
  width: 400px;
  height: 500px;
  position:absolute;
  background-color: #fff;
  border: blue 2px solid;
  padding: 20px;
  padding-top: 12px;
}
.el-input{
  margin-top: 13px;
  margin-bottom: 5px;
  border: blue 1px solid;
}
.addpeople{
    position: fixed;
    background-color: grey;
    opacity: 0.95;
    width: 100%;
    height: 100%;
    top: 62px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.btn{
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content:space-between;
}

</style>
