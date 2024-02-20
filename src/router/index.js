import {createRouter,createWebHistory} from 'vue-router';
import HomeComponent from '@/components/HomeComponent.vue';
import LoginComponent from '@/components/Login_User.vue';
import MypageComponent from '@/components/MyPage.vue';
import UpdateMyInfoComponent from '@/components/UpdateMyInfo.vue';
import MyOrderListComponent from '@/components/orderList.vue';
import StoreDetailComponent from '@/components/StoreDetail.vue';
const routes = [
  {path:'/' , name: 'HOME' , component: HomeComponent},
  
  {path:'/login' , name: 'Login' , component: LoginComponent},
  {path:'/mypage' , name: 'MyPage' , component: MypageComponent},
  {path:'/update/myinfo' , name: 'UpdateMyInfo' , component: UpdateMyInfoComponent},


  {path:'/store' , name: 'Store' , component: StoreDetailComponent},
  {path:'/myOrderList' , name: 'MyOrderList' , component: MyOrderListComponent},
]
const router = createRouter({
  history: createWebHistory(),
  routes
}
);
export default router;