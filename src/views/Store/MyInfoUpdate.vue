<template>
    <div class="min-h-screen flex bg-gray-100">
      <!-- 왼쪽 사이드바 -->
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
      <div class="w-5/6 p-8">
        <h2 class="text-3xl font-semibold mb-6 text-gray-800">프로필 수정</h2>
        <form @submit.prevent="submitProfile">
          <div class="bg-white p-4 rounded-md">
            <label class="block text-lg font-bold text-gray-600">닉네임</label>
            <input v-model="nickname" id="nickname" type="text" class="mt-1 p-3 border rounded-md w-full">
            <div>
              <label class="block text-lg font-bold text-gray-600">이메일</label>
              <div class="mt-1 p-3 border rounded-md w-full">
                {{ memberInfo.email }}
              </div>
            </div>
            
            <label class="block text-lg font-bold text-gray-600 mt-4">휴대폰번호</label>
            <input v-model="phonenumber" id="phonenumber" type="tel" class="mt-1 p-3 border rounded-md w-full">
            <label class="block text-lg font-bold text-gray-600 mt-4">비밀번호</label>
            <input v-model="password" id="password" type="password" class="mt-1 p-3 border rounded-md w-full">
            <button type="submit" class="bg-black text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800">
              수정
            </button>
          </div>
        </form>
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
    created(){
      this.fetchMember();
    },
    methods: {
      async fetchMember() {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/members/my-info`, { headers });
        this.memberInfo = response.data.result;
        console.log(this.memberInfo);
        document.getElementById('nickname').placeholder = this.memberInfo.nickName;
        document.getElementById('email').placeholder = this.memberInfo.email;
        document.getElementById('phonenumber').placeholder = this.memberInfo.phoneNumber;
      } catch (error) {
        console.log(error);
      }
    },
      submitProfile() {

      },
    },
  };
  </script>
  
  