<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- 왼쪽 사이드바 -->
    <div class="w-1/6 bg-white p-4">
      <ul>
        <a href="/my-info"><li class="text-lg font-bold mb-2 hover:border-gray-300  hover:border-b-2">내 정보</li></a>
        <a href="/my-orders"><li class="text-lg font-bold mb-2 hover:border-gray-300  hover:border-b-2">주문 내역</li></a>
        <a href="/my-favorite"><li class="text-lg font-bold mb-2 hover:border-gray-300  hover:border-b-2">찜 목록</li></a>
        <a href="/my-review"><li class="text-lg font-bold mb-2 hover:border-gray-300  hover:border-b-2">리뷰 목록</li></a>
        <a href="/update/myinfo/"><li class="text-lg font-bold mb-2 hover:border-gray-300  hover:border-b-2">정보 수정</li></a>
        <!-- 추가적인 카테고리 항목들을 필요에 따라 나열하세요 -->
      </ul>
    </div>

    <!-- 오른쪽 컨텐츠 영역 -->
    <div class="w-5/6 p-8 flex flex-col">
      <h2 class="text-3xl font-semibold mb-6 text-gray-800">찜 목록</h2>
      <div v-if="favorites.length > 0" class="bg-white p-4 rounded-md">
        <ul>
          <li v-for="favorite in favorites" class="mb-2" :key="favorite.id">
            <img :src="favorite.imageUrl" alt="메뉴 이미지" class="menu-img w-16 h-16 object-cover rounded-lg">
            <div>
              <p class="text-gray-600">{{ favorite.storeName }}</p>
              <p class="text-gray-600">{{ favorite.category }}</p>
              <p class="text-gray-600">{{ favorite.storeStatus }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="bg-white p-4 rounded-md">
        <p>찜 내역이 없습니다.</p>
      </div>
    </div>
  </div>
  
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      favorites: {},
    };
  },
  created() {
    this.fetchFavorites();
  },
  methods: {
    async fetchFavorites() {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/members/favorites`, { headers });
        this.favorites = response.data.result;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
/* Tailwind CSS 클래스를 직접 사용하거나 추가적인 스타일을 작성할 수 있습니다. */
</style>

