<template>
  <div class="add_button" @dragend="move" id="add2">
      <div class="add" @click="adduser"></div>
  </div>
</template>

<script>
export default {
        name:"add",
        methods:{
           adduser(){
               this.$emit("sonadd")
           },
            move(){
          this.odiv= document.getElementById("add2")
          this.odiv.style.top = parseInt(this.y - 40) + "px";
          this.odiv.style.left = parseInt(this.x - 20) + "px";

     },
     
        },
        data(){
          return {
              odiv:"",
              x:0,
              y:0
          }
        },
         mounted(){

    document.onmousemove = event =>{
      this.x = event.pageX
      this.y = event.pageY
    }
}
}
</script>

<style>
.add_button{
    position: fixed;
    background-color: #c6ffdd;
    border-radius: 40px;
    bottom: 100px;
    right: 50px;
    height: 80px;
    width:80px;
    font-size: 10px;
    z-index: 998;
    text-align: center;
}
.add_button:hover{
    
    background-color: #f7797d;
    transition: 1s;
}
.add {
  width: 80px;
  height: 80px;
  color: #ccc;
  transition: color .25s;
  position: relative;
}

.add::before{
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 64px;
  margin-left: -32px;
  margin-top: -5px;
  border-top: 10px solid;
}
.add::after {
 content: '';
 position: absolute;
 left: 50%;
 top: 50%;
 height: 64px;
 margin-left: -5px;
 margin-top: -32px;
 border-left: 10px solid;
}

</style>