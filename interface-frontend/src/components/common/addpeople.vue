<template>
  <div class="addpeople">
    <div class="addcontent">
      <div>
          <span>姓名</span><span style="color:red">*</span><el-input v-model="user_name">{{user_name}}</el-input>
      </div>
      <div>
        <span>部门</span><span style="color:red">*</span><el-input  v-model="group">{{group}}</el-input>
      </div>
      <div>
        <span>项目</span><span style="color:red">*</span><el-input v-model="project_id">{{project_id}}</el-input>
      </div>
      <div>
        <span>联系方式</span><el-input v-model="phone_number">{{phone_number}}</el-input>
      </div>
      <div>
        <span>技能</span><span style="color:red">*</span><el-input v-model="skill">{{skill}}</el-input>
      </div>
    <div class="btn">
       <el-button type="danger" @click="cancel">取消</el-button>
      <el-button type="success" @click="addpeople">提交</el-button>
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

      addpeople(){
         if( this.user_name == ""){
          this.$message.error("姓名不能为空")
          return
        }
        console.log(this.edit)
        if(!this.edit){
          // 新增
            post("http://localhost:8888/people/add_people",{
            "user_name":this.user_name,
            "project_id":this.project_id,
            "group":this.group,
            "phone_number":this.phone_number,
            "skill":this.skill
            }).then(data=>{
              if(data.data.code == 500){
                throw Error
              }
              this.$message.success("新增成功")
                post("http://localhost:8888/log/add_log",{
                "detail":"增加开发人员:" + this.user_name,
                "user_name":sessionStorage.getItem("user"),
                "time":getNowTime()
                })
                setTimeout(()=>{
                    history.go(0)
                },1300)
            }).catch(err=>{
              console.log(err)
              this.$message.error("新增失败")
            }).finally(()=>{
              this.cancel()
            })
      }else{
          console.log("edit")
         post("http://localhost:8888/people/update_people",{
            "user_name":this.user_name,
            "project_id":this.project_id,
            "group":this.group,
            "phone_number":this.phone_number,
            "skill":this.skill,
            "id":this.id
            }).then(data=>{
              if(data.data.code == 500){
                throw Error
              }
              this.$message.success("修改成功")
                post("http://localhost:8888/log/add_log",{
                "detail":"修改开发人员信息:" + this.user_name,
                "user_name":sessionStorage.getItem("user"),
                "time":getNowTime()
                })
            }).catch(err=>{
              console.log(err)
              this.$message.error("修改失败")
            }).finally(()=>{
              this.cancel()
            })
      }
      }
  },
  data(){
    return {
    }
  },
  props:{
      user_name:{
        default:""
      },
      edit:{
        default:false
      },
      id:{
        default:0
      },
      skill:{
        default:""
      },
      group:{
        default:""
      },
      phone_number:{
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
.addpeople{
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
    z-index: 999;
}
.btn{
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content:space-between;
}

</style>

