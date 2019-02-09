//Login
import login from '../components/login/index.vue'
import sign from '../components/login/sign.vue'
import create from  '../components/login/create.vue'
import inicio from '../components/inicio/index.vue';
import cliente from '../components/clientes/indexClient.vue'
import creaClient from '../components/clientes/crearCli.vue'
import lotes from '../components/lotes/indexLote.vue'
const rutas= [
   {
      path:'/',
      component:inicio,
   },
   {
      path:'/login',
      component:login,
      redirect:'/login/signIn',
      children:[
         {
            path:'signIn',
            component:sign
         },
         {
            path:'create',
            component:create
         }
      ]
   },
   {
      path:'/clientes',
      component:cliente
   },
   {
      path:'/crearCliente',
      component:creaClient
   },
   {
      path:'/lotes',
      component:lotes
   }
];
export default rutas