//Login
import login from '../components/login/index.vue'
import sign from '../components/login/sign.vue'
import create from  '../components/login/create.vue'
import inicio from '../components/inicio/index.vue';
import cliente from '../components/clientes/indexClient.vue'
import creaClient from '../components/clientes/crearCli.vue'
import lotes from '../components/lotes/indexLote.vue'
import agregarLote from '../components/lotes/agregar1.vue'
import factura from '../components/factura/index.vue'
import viewLot from '../components/lotes/viewLot.vue'
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
   },
   {
      path:'/agregarLote',
      component:agregarLote
   },
   {
      path:'/factura',
      component:factura
   },
   {
      path:'/viewLot',
      component:viewLot
   }
];
export default rutas