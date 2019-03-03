<template>
  <div id="app">
    <div v-if="compania && logiado">
      <menu-bar></menu-bar>
    </div>
    <company-register v-if="compania == false" @cambio="compania = true"></company-register>
    <div v-if="compania" class="content-todos" style="padding-top:55px">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import menuBar from './components/menu/indexMenu'
import companyRegister from './components/company/index'
export default {
  components:{
    menuBar,
    companyRegister
  },
  data(){
    return{
      logiado:false,
      compania:false,
    }
  },
  created(){
    this.estudiar()
  },
  methods:{
    estudiar(){
      if(localStorage.getItem('companyRegister') === null){
        this.compania = false
      }else{
        this.compania = true
        let userReg=null,
        traido = JSON.parse(sessionStorage.getItem('contResolv'))
        if(traido){
          this.$db.get('usuarios',{email:traido.email}).then((res)=>{
            userReg = res
            if(userReg && traido.email === userReg.email && traido.nit === userReg.nit){
              this.logiado=true
            }else{
              this.logiado=false
              this.$router.push('/login')
            }
          })
        }else{
          this.logiado=false
          this.$router.push('/login')
        }
      }
    }
  },
  watch:{
    '$route'(to){
      if(to.path == '/'){
        this.estudiar()
      }
    }
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
    --content-card:#EDEAEA
  }
  @media(min-width:1300px) {
    .content-todos{
      max-width:1250px;
      margin: auto
    }
  }
</style>