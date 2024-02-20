import {createRouter,createWebHistory} from 'vue-router';
import HomeComponent from '@/components/HomeComponent.vue';
import StoreCategories from '@/views/StoreCategories.vue';
const routes = [
  {path:'/' , name: 'HOME' , component: HomeComponent},
  {path:'/categories' , name: 'StoreCategories' , component: StoreCategories ,props: true},
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
}
);
export default router;