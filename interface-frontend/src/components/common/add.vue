<template>
  <div class="add_button" @drag="move" id="add2">
      <div class="add" @click="adduser" ></div>
  </div>
</template>

<script>
export default {
        name:"add",
        methods:{
           adduser(){
               this.$emit("sonadd")
           },
            move(e){
              this.addnode.style.top = e.clientX + "px"
              this.addnode.style.left = e.clientY + "px"

     },
     
        },
        created(){
            this.addnode = document.getElementById("add2")
        },
        destroyed(){
            this.addnode = ""
        },
        data(){
          return {
              odiv:"",
              addnode:"",
              x:0,
              y:0
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