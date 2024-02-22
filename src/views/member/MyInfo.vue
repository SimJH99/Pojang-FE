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
      </ul>
    </div>

    <!-- 오른쪽 컨텐츠 영역 -->
    <div class="w-5/6 p-8 flex flex-col">
      <!-- 내 정보 -->
      <div v-if="true">
        <h2 class="text-3xl font-semibold mb-6 text-gray-800">내 정보</h2>
        <div class="mb-4 bg-white p-4 rounded-md flex flex-col">
          <div>
            <label class="block text-lg font-bold text-gray-600">닉네임</label>
            <div class="mt-1 p-3 border-2 rounded-md">
              {{ memberInfo.nickName }}
            </div>
          </div>
          <div>
            <label class="block text-lg font-bold text-gray-600">이메일</label>
            <div class="mt-1 p-3 border-2 rounded-md">
              {{ memberInfo.email }}
            </div>
          </div>
          <div>
            <label class="block text-lg font-bold text-gray-600">주소</label>
            <div class="mt-1 p-3 border-2 rounded-md">
              {{ memberInfo.address }}
            </div>
          </div>
          <div>
            <label class="block text-lg font-bold text-gray-600">휴대폰번호</label>
            <div class="mt-1 p-3 border-2 rounded-md">
              {{ memberInfo.phoneNumber }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      memberInfo: {},
    };
  },
  created() {
    this.fetchMember();
  },
  methods: {
    async fetchMember() {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/members/my-info`, { headers });
        this.memberInfo = response.data.result;
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

