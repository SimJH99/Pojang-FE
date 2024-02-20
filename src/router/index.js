import {createRouter,createWebHistory} from 'vue-router';
import HomeComponent from '@/components/HomeComponent.vue';
import LoginComponent from '@/components/Login_User.vue';
import MypageComponent from '@/components/MyPage.vue';
import UpdateMyInfoComponent from '@/components/UpdateMyInfo.vue';
import MyOrderListComponent from '@/components/orderList.vue';
import SignUpUserComponent from '@/components/Signup_User.vue';
import SignUpOwnerComponent from '@/components/Signup_Owner.vue';
const routes = [
  {path:'/' , name: 'HOME' , component: HomeComponent},
  {path:'/login' , name: 'Login' , component: LoginComponent},
  {path:'/mypage' , name: 'MyPage' , component: MypageComponent},
  {path:'/update/myinfo' , name: 'UpdateMyInfo' , component: UpdateMyInfoComponent},
  {path:'/myOrderList' , name: 'MyOrderList' , component: MyOrderListComponent},
  {path:'/sign-up-user' , name: 'sign-up-user' , component: SignUpUserComponent},
  {path:'/sign-up-owner' , name: 'sign-up-owner' , component: SignUpOwnerComponent},
]
const router = createRouter({
  history: createWebHistory(),
  routes
}
);
export default router;