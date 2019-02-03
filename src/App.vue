<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created(){
    if(localStorage.getItem('contResolv') === null) this.$router.push('/login')
  }
}
</script>