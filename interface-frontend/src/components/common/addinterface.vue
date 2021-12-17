<template>
  <div class="addinterface">
    <div class="addcontent">
      <div>
          <span>接口名字</span><span style="color:red">*</span><el-input v-model="interface_name">{{interface_name}}</el-input>
      </div>
      <div>
        <span>URL</span><span style="color:red">*</span><el-input  v-model="url">{{url}}</el-input>
      </div>
      <div>
        <span>method</span><span style="color:red">*</span><el-input v-model="methods">{{methods}}</el-input>
      </div>
      <div>
        <span>所属项目</span><el-input v-model="project_id">{{project_id}}</el-input>
      </div>
    <div class="btn">
       <el-button type="danger" @click="cancel">取消</el-button>
      <el-button type="success" @click="addinterface">提交</el-button>
    </div>
    </div>
   
  </div>
</template>

<script>
import {post} from "../../api/index"
export default {
  methods:{
      cancel(){
        this.$emit("cancel")
      },
      addinterface(){
         if( this.interface_name == ""){
          this.$message.error("接口名不能为空")
          return
        }

        post("http://localhost:8888/interface/add_interface",{
        "interface_name":this.interface_name,
        "project_id":this.project_id,
        "url":this.url,
        "method":this.method
        }).then(data=>{
          if(data.data.code == 500){
            throw Error
          }
          this.$message.success("新增成功")
        }).catch(err=>{
          console.log(err)
          this.$message.error("新增失败")
        }).finally(()=>{
          this.cancel()
        })

      }
  },
  data(){
    return {
    }
  },
  props:{
      interface_name:{
        default:""
      },
      url:{
        default:""
      },
      methods:{
        default:""
      },
      
      project_id:{
        default:1
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
.addinterface{
    position: fixed;
    background-color: grey;
    opacity: 0.82;
    width: 100%;
    height: 100%;
    top: 62px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
.btn{
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content:space-between;
}

</style>

