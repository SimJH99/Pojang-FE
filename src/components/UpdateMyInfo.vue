<template>
    <div class="min-h-screen flex bg-gray-100">
      <!-- 왼쪽 사이드바 -->
      <div class="w-1/6 bg-white p-4">
        <h3 class="text-lg font-bold mb-2">블로그 카테고리</h3>
        <ul>
          <li><a href="#">카테고리 1</a></li>
          <li><a href="#">카테고리 2</a></li>
          <li><a href="#">카테고리 3</a></li>
          <!-- 추가적인 카테고리 항목들을 필요에 따라 나열하세요 -->
        </ul>
      </div>
  
      <!-- 오른쪽 컨텐츠 영역 -->
      <div class="w-5/6 p-8">
        <h2 class="text-3xl font-semibold mb-6 text-gray-800">프로필 수정</h2>
        <form @submit.prevent="submitProfile">
          <div class="bg-white p-4 rounded-md">
            <label class="block text-lg font-bold text-gray-600">닉네임</label>
            <input v-model="editedProfile.nickname" type="text" class="mt-1 p-3 border rounded-md w-full">
            <label class="block text-lg font-bold text-gray-600 mt-4">이메일</label>
            <input v-model="editedProfile.email" type="email" class="mt-1 p-3 border rounded-md w-full" disabled>
            <!-- 이메일은 수정 불가능하도록 disabled 속성 추가 -->
            <label class="block text-lg font-bold text-gray-600 mt-4">주소</label>
            <input v-model="editedProfile.address" type="text" class="mt-1 p-3 border rounded-md w-full">
            <label class="block text-lg font-bold text-gray-600 mt-4">휴대폰번호</label>
            <input v-model="editedProfile.phone" type="tel" class="mt-1 p-3 border rounded-md w-full">
            <label class="block text-lg font-bold text-gray-600 mt-4">비밀번호</label>
            <input v-model="editedProfile.password" type="password" class="mt-1 p-3 border rounded-md w-full">
            <button type="submit" class="bg-black text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        editedProfile: {
          nickname: 'JohnDoe',
          email: 'john.doe@example.com',
          address: '123 Main St, City, Country',
          phone: '010-1234-5678',
          password: '', // 비밀번호 추가
        },
      };
    },
    methods: {
      submitProfile() {
        // 프로필 수정 로직을 추가
        console.log('프로필 수정 저장 시도:', this.editedProfile);
        // 실제로는 서버에 수정된 프로필을 전송하는 로직을 추가해야 합니다.
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS 클래스를 직접 사용하거나 추가적인 스타일을 작성할 수 있습니다. */
  </style>
  