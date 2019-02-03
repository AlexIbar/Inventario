//Login
import login from '../components/login/index.vue'
import sign from '../components/login/sign.vue'
import create from  '../components/login/create.vue'
const rutas= [
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
   }
];
export default rutas