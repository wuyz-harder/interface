<template>
  <div class="search">
      <add @sonadd="addinterface()"></add>
      <addinterface v-if="isdisplay" @cancel="addinterface()"></addinterface>
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
        <el-button type="primary" @click="delete_interface">确 定</el-button>
      </span>
    </el-dialog>
          <el-table
            :data="interface_list"
            style="width: 92%"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="id"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="interface_name"
              label="接口名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="url"
              label="路径URL"
              width="320">
            </el-table-column>
            <el-table-column
              prop="method"
              label="方法"
              width="100"
              >
            </el-table-column>
            <el-table-column
              prop="project_name"
              label="所属项目">
            </el-table-column>
             <el-table-column label="操作">
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
import addinterface from "./common/addinterface.vue"
import add  from "../components/common/add.vue"
import { get,del,post } from '../api/index'
import pagination from '../components/common/pagination.vue'
export default {
  components: { search, add, addinterface,pagination},
  name:"interface_list",
  data(){
    return{
      isdisplay:false,
      dialogVisible:false,
      interface_list:[],
      search_name:"",
      index :0,
      row:0,
      total:0,
      current_page_size:8,
      showData:[]
    }
  },
   methods:{
       addinterface(){
       this.isdisplay = !this.isdisplay
     },
     CurrentChange(start,end){
        this.showData = this.interface_list.slice(start,end)
      },
     delete_interface(){
       this.dialogVisible = false
       del("http://localhost:8888/interface/delete_interface",{id:this.interface_list[this.index]["id"].toString()}).then(data=>{
         this.$message({
          message: data.data.msg,
          type: 'success',
          
        });
        this.total = this.total - 1
          post("http://localhost:8888/log/add_log",{
            "detail":"删除接口" + this.interface_list[this.index].interface_name,
            "user_name":sessionStorage.getItem("user"),
            "time":this.getNowTime()
          }
            )
          this.interface_list.splice(this.index,1)

       }).catch(err=>{
          this.$message.error(err);
       }) 
       
     },
      handleEdit(index, row) {
        this.isdisplay = !this.isdisplay
        console.log(index, row)
        
      },
       handleDelete(index, row) {
        this.dialogVisible = true
        console.log(index, row)
        this.index = index
        this.row = row
      },
      search(interface_name){
          this.search_name = interface_name
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
    get("http://localhost:8888/interface/get_interface").then(data=>{

          if(data instanceof Array){
        
          this.interface_list = data
          this.total = this.interface_list.length
          this.showData = this.interface_list.slice(0,this.current_page_size)
          }
        }).catch((err)=>{
          console.log(err)
          this.$message.error(err)
        })
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