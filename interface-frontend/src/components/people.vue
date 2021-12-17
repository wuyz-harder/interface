<template>
  <div class="search">
    <addpeople v-if="isdisplay" @cancel="adduser()" 
    :group="group" 
    :phone_number="phone"
    :project_id="project_id"
    :user_name="user_name"
    :skill="skill"
    :edit="edit"
    :id = "id"
    ></addpeople>
    <add 
    @sonadd="adduser()" 
    id="add"
    draggable="true"></add>
      <search @search="search"></search>
      <div class="content">
          <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>您确认删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delete_people">确 定</el-button>
      </span>
    </el-dialog>
          <el-table
            :data="people"
            style="width: 92%"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="id"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user_name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="group"
              label="所属部门"
              width="180">
            </el-table-column>
            <el-table-column
              prop="project_name"
              label="开发项目">
            </el-table-column>
            <el-table-column
              prop="phone_number"
              label="联系方式">
            </el-table-column>
              <el-table-column
              prop="skill"
              label="技能">
            </el-table-column>
             <el-table-column label="操作" style="overflow:scroll">
              <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
      </div>
       <div>
        <pagination @CurrentChange = "CurrentChange" :current_page_size="current_page_size" :total="total"></pagination>
      </div>
    </div>
   
</template>
<script>
import search from './search.vue'
import add from "./common/add.vue"
import addpeople from "./common/addpeople.vue"
import { get,del,post } from '../api/index'
import pagination from '../components/common/pagination.vue'
export default {
  components: { search, add, addpeople,pagination },
  data(){
    return{
      isdisplay:false,
      dialogVisible:false,
      people:[],
      search_name:"",
      index :0,
      row:0,
      user_name:"",
      skill:"",
      group:"",
      phone_number:"",
      project_id:1,
      total:0,
      current_page_size:8,
      showData:[],
      edit:false,
      id:0
     
      
    }
  },
   methods:{
     adduser(){
       this.isdisplay = !this.isdisplay
       this.edit = false
     },
     delete_people(){
       this.dialogVisible = false
       del("http://localhost:8888/people/delete_people",{
         id:this.people[this.index]["id"].toString(),
         name:this.people[this.index]["user_name"],
         maker:sessionStorage.getItem("user")
         }).then(data=>{
         this.$message({
          message: data.data.msg,
          type: 'success'
        });
          this.total = this.total - 1
          post("http://localhost:8888/log/add_log",{
            "detail":"删除开发人员" + this.people[this.index].user_name,
            "user_name":sessionStorage.getItem("user"),
            "time":this.getNowTime()
          }
            )
          this.people.splice(this.index,1)

       }).catch(err=>{
          this.$message.error(err);
       }) 
       
     },
      handleEdit(index, row) {
        this.id = this.people[index].id
         this.isdisplay = !this.isdisplay
        console.log(index, row);
        this.user_name = this.people[index].user_name
        this.project_id = this.people[index].project_id
        this.skill = this.people[index].skill
        this.phone = this.people[index].phone_number
        this.group= this.people[index].group
        this.edit = true
      },
       handleDelete(index, row) {
        this.dialogVisible = true
        console.log(index, row)
        this.index = index
        this.row = row
      },
      search(people_name){
          this.search_name = people_name
      },
       tableRowClassName({row, rowIndex}) {
         console.log(row)
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      CurrentChange(start,end){
        this.showData = this.people.slice(start,end)
      },
      getNowTime: function () {
      let dateTime
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1
      let dd = new Date().getDate()
      let hh = new Date().getHours()
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes()
        :
        new Date().getMinutes()
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
        :
        new Date().getSeconds()
      dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
      return dateTime
    }
    },
  mounted(){
    
    get("http://localhost:8888/people/get_people").then(data=>{
      if(data instanceof Array){
          this.people = data
          this.total = this.people.length
          this.showData = this.people.slice(0,this.current_page_size)
      }
        }).catch((err)=>{
           this.$message.error(err)
        })
  },
  destroyed(){
    this.odiv = null
  }
}
</script>

<style>
.el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  .content{
    text-align: center;
    height: 550px;
    overflow:scroll;
  }
  .el-table{
    margin-left: 50px;
    text-align: center;
  }
  .el-table-column{
    margin-right: 50px;
    text-align: center;
  }
  .el-table th.el-table__cell{
    text-align: center;
  }
  .el-table--enable-row-transition .el-table__body td.el-table__cell{
    text-align: center;
  }
 
</style>