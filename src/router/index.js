import {createRouter,createWebHistory} from 'vue-router';
import HomeComponent from '@/components/HomeComponent.vue';
import LoginComponent from '@/components/Login_User.vue';
import UpdateMyInfoComponent from '@/components/UpdateMyInfo.vue';
import StoreDetailComponent from '@/components/StoreDetail.vue'; 
import ReviewList from '@/components/ReviewList.vue';
import MenuList from '@/components/MenuList.vue';
import SignUpUserComponent from '@/components/Signup_User.vue';
import SignUpOwnerComponent from '@/components/Signup_Owner.vue';

// export default인 경우에는 {} 필요없고, 여러개 요소가 있을 경우 {} 필요
import { memberRoutes } from "./memberRouter.js";
import { orderRoutes } from "./orderRouter.js";
import { menuRoutes } from "./menuRouter.js";
import { storeRoutes } from "./storeRouter.js";

const routes = [
  {path:'/' , name: 'HOME' , component: HomeComponent},
  {path:'/login' , name: 'Login' , component: LoginComponent},
  {path:'/update/myinfo' , name: 'UpdateMyInfo' , component: UpdateMyInfoComponent},
  {path:'/menu' , name: 'Menu' , component: MenuList},
  {path:'/review' , name: 'Review' , component: ReviewList},
  {path:'/store' , name: 'Store' , component: StoreDetailComponent},
  {path:'/sign-up-user' , name: 'sign-up-user' , component: SignUpUserComponent},
  {path:'/sign-up-owner' , name: 'sign-up-owner' , component: SignUpOwnerComponent},
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