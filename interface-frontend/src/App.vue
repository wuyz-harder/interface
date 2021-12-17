<template>
  <div id="app">
    <div id="nav">
      <router-view></router-view>
      <!-- <navigator></navigator> -->
      
    </div>
  </div>
</template>
<script>
// import navigator from './components/navigator.vue'
export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  border: 0;
}
/* #app{
  padding: 0;
  overflow: hidden;
} */
</style>
