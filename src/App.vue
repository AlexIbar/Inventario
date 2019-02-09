<template>
  <div id="app">
    <div>
      <menu-bar v-if="logiado"></menu-bar>
    </div>
    <div class="content-todos" style="padding-top:55px">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import menuBar from './components/menu/indexMenu'
export default {
  components:{
    menuBar
  },
  data(){
    return{
      logiado:true,
    }
  },
  created(){
    /*if(localStorage.getItem('contResolv') === null){
      this.$router.push('/login')
    }else{
      this.logiado=true
    }*/
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab');
*{
  margin: 0px;
  padding: 0px;
  font-size: 14px;
  box-sizing: border-box;
  font-family: 'Roboto Slab', serif;
}
  :root{
    --naranja:#FF9800;
    --content-text:#FFB74C;
    --content-oscuro:#CC7A00;
  }
  @media(min-width:1300px) {
    .content-todos{
      max-width:1250px;
      margin: auto
    }
  }
</style>