<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- 왼쪽 사이드바 -->
    <div class="w-1/6 bg-white p-4">
      <ul>
        <li class="text-lg font-bold mb-2"><a href="/my-info">내 정보</a></li>
        <li class="text-lg font-bold mb-2"><a href="/my-orders">주문 내역</a></li>
        <li class="text-lg font-bold mb-2"><a href="/my-favorite">찜 목록</a></li>
        <li class="text-lg font-bold mb-2"><a href="/my-review">리뷰 목록</a></li>
        <li class="text-lg font-bold mb-2"><a href="/my-info/update">정보 수정</a></li>
        <!-- 추가적인 카테고리 항목들을 필요에 따라 나열하세요 -->
      </ul>
    </div>

    <!-- 오른쪽 컨텐츠 영역 -->
    <div class="w-5/6 p-8 flex flex-col">
      <h2 class="text-3xl font-semibold mb-6 text-gray-800">찜 목록</h2>
      <div v-if="favorites.length > 0" class="bg-white p-4 rounded-md">
        <ul>
          <li v-for="favorite in favorites" :key="favorite.id" class="mb-2">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">찜 번호: {{ favorite.id }}</h3>
            <p class="text-gray-600">찜한 가게: {{ favorite.store }}</p>
            <p class="text-gray-600">가게 카테고리: {{ favorite.category }}</p>
            <p class="text-gray-600">가게 상태: {{ order.orderStatus }}</p>
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

