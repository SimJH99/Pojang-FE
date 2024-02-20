import {createRouter,createWebHistory} from 'vue-router';
import HomeComponent from '@/components/HomeComponent.vue';
import LoginComponent from '@/components/Login_User.vue';

// export default인 경우에는 {} 필요없고, 여러개 요소가 있을 경우 {} 필요
import { memberRoutes } from "./memberRouter.js";
import { orderRoutes } from "./orderRouter.js";
import { menuRoutes } from "./menuRouter.js";
import { storeRoutes } from "./storeRouter.js";

const routes = [
  {path:'/' , name: 'HOME' , component: HomeComponent},
  {path:'/login' , name: 'Login' , component: LoginComponent},

  ...memberRoutes,
  ...orderRoutes,
  ...menuRoutes,
  ...storeRoutes,
]
const router = createRouter({
  history: createWebHistory(),
  routes
}
);
export default router;