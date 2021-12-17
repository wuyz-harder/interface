<template>
<div class="mainlog">
  <div class="tb">
  <el-table
    :data="showData"
    >
    <el-table-column
      label="日期"
      width="300">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作者"
      width="250">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.user_name }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.user_name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
      <el-table-column
      label="详细"
      width="300"
      style="text-align:center"
      >
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>详细: {{ scope.row.detail }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.detail }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <pagination @CurrentChange = "CurrentChange" @CurrentSize = "CurrentSize" :current_page_size="current_page_size" :total="total"></pagination>
 
</div>
</template>

<script>
  import { get } from "../api/index"
  import pagination from '../components/common/pagination.vue'
  export default {
  components: { pagination },

    mounted(){
        get("http://localhost:8888/log/get_log").then(data =>{
            
             if(data instanceof Array){
              this.logData = data
              this.showData = this.logData.slice(0,this.current_page_size)
              this.total = this.logData.length
             }

        }).catch(err=>{
         
          this.$message.error(err)
        })
    },
    data() {
      return {
        logData: [],
        showData:[],
        currentPage: 1,
        total:0,
        current_page_size:8,
      }
    },
    methods: {
      CurrentChange(start,end){
        this.showData = this.logData.slice(start,end)
      },
      CurrentSize(start,end,size){
        this.showData = this.logData.slice(start,end)
        this.current_page_size = size
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>
<style scoped>
.mainlog{
    margin: 61px ;
    margin-left: 50px;
    margin-top: 11px !important;
    margin-bottom: 50px;
   text-align: center;
   
}
.tb{
  text-align: center;
}
.el-table{
  height: 620px;
 overflow: scroll;
 width: 92%;
}
.block{
  display: flex;
  justify-items: center;
  align-items: center;

}
.el-pagination{
  margin: 20px auto;
}
.el-table .el-table__cell{
  padding: 6px 0;
}
.el-table-column{
  text-align: center;
}
</style>