//Librerias
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueMq from 'vue-mq'
//Archivos Person
import routes from './adiciones/roter'

//Use
Vue.use(VueRouter)
Vue.use(VueMq,{
  breakpoints:{
    sm:650,
    md:1250,
    lg:Infinity
  }
})

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
