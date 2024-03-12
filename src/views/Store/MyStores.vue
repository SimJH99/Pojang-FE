<template>
  <div class="min-h-screen flex bg-gray-100">
    <div class="w-1/6 bg-white p-4">
      <ul>
          <li class="text-lg font-bold mb-2"><a href="/my-info-owner">내 정보</a></li>
          <li class="text-lg font-bold mb-2"><a href="/update-my-info">내 정보 수정</a></li>
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
          <a href="/my-store-info">
            <div class="bg-white rounded-md shadow-md p-6" flex>
              <div class="flex items-center mb-2">
                <img :src="store.imageUrl" class="h-24 w-auto object-cover mb-2 rounded-md mr-4">
                <div>
                  <p class="text-xl font-semibold text-gray-700 mb-2">{{ store.name }}</p>
                  <p class="text-l font-semibold text-gray-600 mb-2">{{ store.category }}</p>
                  <p class="text-l font-semibold text-gray-600 mb-2">{{ store.status }}</p>
                </div>
              </div>
              <div class="flex space-x-5 text-left mt-2">
                <button v-if="store.status == 'CLOSED'" @click.prevent="openStore(store.id)" class="bg-blue-300 px-4 py-2 rounded text-white">영업 시작</button>
                <button v-else @click.prevent="closeStore(store.id)" class="bg-red-300 px-4 py-2 rounded text-white">영업 종료</button>
              </div>
            </div>
            
          </a>
        </router-link>
      </div>
      <div v-else class="bg-white p-4 rounded-md">
        <p>등록된 매장이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MyStoreInfo from '@/views/Store/MyStoreInfo';
import { EventSourcePolyfill } from 'event-source-polyfill';
export default {
  data() {
    return {
      stores: [],
      eventSource: null, // 이벤트 소스 객체
    };
  },
  created() {
    this.fetchOrders();
  },
  mounted(){
    this.connectToSSE(); // SSE 연결
  },
  beforeUnmount() {
    // 컴포넌트 해제 전에 SSE 연결 종료
    if (this.eventSource) {
      this.eventSource.close();
    }
  },
  methods: {
    components:{
      MyStoreInfo
    },
    connectToSSE() {
      const token = localStorage.getItem('token');
      let lastEventId = localStorage.getItem('lastEventId') || '';
      const url = `${process.env.VUE_APP_API_BASE_URL}/subscribe`;
      const eventSourceInitDict = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Last-Event-ID': lastEventId,
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no',
          heartbeatTimeout: 120000,
        },
      };
      this.eventSource = new EventSourcePolyfill(url, eventSourceInitDict);
      // this.eventSource.addEventListener('SSE', (event) => {
      //   console.log(event);
      // });
      // server에서 sseEmitter send할 때, name이 없으면 
      // addEventListener 대신 아래 코드 사용
      this.eventSource.onmessage = (event) => {
        console.log(event.data);
        console.log("Json 형변환 " + JSON.stringify(event.data));
        // alert(event.data);
      }
      this.eventSource.onerror = (error) => {
        console.log(error);
        this.eventSource.close();
      };
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
    MyStoreInfoId(StoreId){
      return { path: `/${StoreId}/my-store-info`, params: {id: StoreId}}
    },
    async openStore(id) {
      try{
            const token = localStorage.getItem('token');
            const headers = {Authorization: `Bearer ${token}`} 
            await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${id}/open`, {}, {headers});
            alert("영업이 시작되었습니다.");
            window.location.reload();
        } catch(error){
          alert(error.response.data.message);
        }
    },
    async closeStore(id) {
      try{
            const token = localStorage.getItem('token');
            const headers = {Authorization: `Bearer ${token}`} 
            await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${id}/close`, {}, {headers});
            alert("영업을 종료합니다.");
            window.location.reload();
        } catch(error){
          alert(error.response.data.message);
        }
    },
    myStoreInfoId(storeId){
      return { path: `/${storeId}/my-store-info`, params: {id: storeId}}
    }
  },
};
</script>

<style scoped>
/* Tailwind CSS 클래스를 직접 사용하거나 추가적인 스타일을 작성할 수 있습니다. */
</style>
