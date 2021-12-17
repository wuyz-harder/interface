<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
       :current-page=currentPage
      :page-sizes=page_sizes
      :page-size=current_page_size
      layout="total, sizes, prev, pager, next, jumper"
      :total=total>
    </el-pagination>
  </div>
</template>
<script>
  export default {
      name:"pagination",
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentSize = val
        console.log(this.currentSize)
        this.$emit("CurrentSize",this.currentSize*(this.currentPage-1),this.currentSize*this.currentPage)
      },
      handleCurrentChange(val) {
          this.currentPage = val
        console.log(`当前页: ${val}`);
        console.log(this.currentSize)
        this.$emit("CurrentChange",this.currentSize*(this.currentPage-1),this.currentSize*this.currentPage)
      }
    },
    data() {
      return {
          currentPage: 1,
          currentSize:8,
          page_sizes:[8,16,24,32],
      };
    },
    props:{
        current_page_size:{
            default:8
        },
        total:{
            default:0
        }
    }
  }
</script>
<style scoped>
.el-pagination{
  margin: 30px auto;
}
.block{
  display: flex;
  justify-items: center;
  align-items: center;

}
</style>