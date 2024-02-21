<template>
  <div class="min-h-screen flex bg-gray-100">
    <div class="w-1/6 bg-white p-4">
      <ul>
          <li class="text-lg font-bold mb-2"><a href="/my-info-owner">내 정보</a></li>
          <li class="text-lg font-bold mb-2"><a href="/my-info-update">내 정보 수정</a></li>
          <li class="text-lg font-bold mb-2"><a href="/store-create">매장 등록</a></li>
          <li class="text-lg font-bold mb-2"><a href="/my-stores">내 매장리스트</a></li>
          <!-- 추가적인 카테고리 항목들을 필요에 따라 나열하세요 -->
      </ul>
  </div>
    <!-- 오른쪽 컨텐츠 영역 -->
    <div class="w-5/6 p-8 flex flex-col">
      <h2 class="text-3xl font-semibold mb-6 text-gray-800">내가게</h2>
      <div v-if="stores.length > 0" class="grid grid-cols-1 gap-4">

        <router-link v-for="store in stores" :key="store.id" class="bg-white rounded-md shadow-md p-6" :to="MyStoreInfoId(store.id)">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">매장 등록 번호: {{ store.id }}</h3>
          <a href="/my-store-info">
            <div class="bg-white rounded-md shadow-md p-6" flex>
              <p class="text-gray-600">매장명: {{ store.name }}</p>
              <p class="text-gray-600"><img :src="getImage(store.id)" class="h-24 w-auto mt-2"></p>
            </div>
          </a>
        </router-link>
      </div>
      <div v-else class="bg-white p-4 rounded-md">
        <p>주문 내역이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MyStoreInfo from '@/views/Store/MyStoreInfo';
export default {
  data() {
    return {
      stores: [],
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    components:{
      MyStoreInfo
    },  
    async fetchOrders() {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/members/stores`, {headers});
        console.log(response);
        this.stores = response.data.result;
      } catch (error) {
        console.log(error);
      }
    },
    getImage(id) {
      return `${process.env.VUE_APP_API_BASE_URL}/api/stores/${id}/image`;
    },
    MyStoreInfoId(StoreId){
      return { path: `/${StoreId}/my-store-info`, params: {id: StoreId}}
    }
  },
};
</script>

<style scoped>
/* Tailwind CSS 클래스를 직접 사용하거나 추가적인 스타일을 작성할 수 있습니다. */
</style>
