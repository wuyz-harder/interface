<template>
  <div class="strategy-mmain-block">
      <div><span>项目名：</span><slot  name="name"></slot></div>
      <div><span >创建者：</span><slot name="maker"></slot></div>
      <div><span >接口数量：</span><slot name="number"></slot></div> 
      <div><span >描述：</span><slot name="description"></slot></div> 
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.strategy-mmain-block {
    height: 140px;
    width:28%;
    margin-top: 10px;
    background-image: linear-gradient(#7ec6bc, #ebe717);
    box-shadow: 0  2px  10px  0 rgba(0, 0, 0, 0.05);
    border-radius: 5px;
   margin-left:50px ;
}
.strategy-mmain-block div{
    margin-left: 5px;
    margin-top: 10px;
    text-align: left;
}
</style>