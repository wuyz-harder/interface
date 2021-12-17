<template>
<div class="project" >
  <addproject v-if="isdisplay" @cancel="addproject()"></addproject>
  <add @sonadd="addproject()"></add>
    <div class="search">
      <search @search="search"></search>
    </div>
    <div class="content" v-if="search_name">
      <card v-for="(item,index) in project_data" :key="index" v-show="item.project_name == search_name">
        <span slot="name">{{item.project_name}}</span>
        <span slot="maker">{{item.maker}}</span>
        <span slot="number">{{item.interface_number}}</span>
        <span slot="description">{{item.description}}</span>
      </card>
    </div>
    <div class="content" v-else>
      <card v-for="(item,index) in project_data" :key="index">
        <span slot="name">{{item.project_name}}</span>
        <span slot="maker">{{item.maker}}</span>
        <span slot="number">{{item.interface_number}}</span>
        <span slot="description">{{item.description}}</span>
      </card>
    </div>
</div>
</template>

<script>
import card from "./common/card.vue"
import search from './search.vue'
import {get} from '../api/index'
import add from './common/add.vue'
import addproject from "./common/addproject.vue"
export default {
  components: { search,card, add, addproject},
    name:"project",
    mounted(){
      if(!sessionStorage.getItem("user")){
        this.$message.error("你还没登录哦，1秒后跳转到登录页面")
        this.timeid = setTimeout(()=>{
           this.$router.push("/login")
        },2000)
       
      }else{
        get("http://localhost:8888/home/get_project").then(data=>{
          this.project_data = data
        }).catch((err)=>{
        
          this.$message.error(err)
        })
      }
    },
    methods:{
       addproject(){
       this.isdisplay = !this.isdisplay
     },
      search(project_name){
          this.search_name = project_name
      }
    },
    beforeDestroy(){
      clearTimeout(this.timeid)
      this.timeid = ""
    },
    data(){
      return {
        timeid:"",
        isdisplay:false,
        search_name:"",
        project_data:[]
      }
    }
   
}
</script>

<style scoped>

.content{
 display: flex;
 flex-wrap: wrap;
}
.search{
  position:sticky;
  top:61px;
}

</style>