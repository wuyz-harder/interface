<template>
<div class="main">
  <el-input
  type="textarea"
  autosize
  placeholder="请输入内容"
  v-model="name">
</el-input>
<div class="search">
    <el-button @click="search">搜索</el-button>
</div>
</div>
</template>

<script>
export default {
    data(){
        return {
            name:""
        }
    },
    methods:{
        search(){
            this.$emit("search",this.name)
        }
    }

}
</script>

<style>



.main{
    margin: 10px 50px;
    display: flex;
    align-items:center;
   
}
</style>