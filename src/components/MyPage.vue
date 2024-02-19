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
      <div class="w-5/6 p-8 flex flex-col">
        <h2 class="text-3xl font-semibold mb-6 text-gray-800">마이 페이지</h2>
        <div class="mb-4 bg-white p-4 rounded-md flex flex-col">
          <div>
            <label class="block text-lg font-bold text-gray-600">닉네임</label>
            <div class="mt-1 p-3 border-2 rounded-md">
              {{ userInfo.nickname }}
            </div>
          </div>
          <div>
            <label class="block text-lg font-bold text-gray-600">이메일</label>
            <div class="mt-1 p-3 border-2 rounded-md">
              {{ userInfo.email }}
            </div>
          </div>
          <div>
            <label class="block text-lg font-bold text-gray-600">주소</label>
            <div class="mt-1 p-3 border-2 rounded-md">
              {{ userInfo.address }}
            </div>
          </div>
          <div>
            <label class="block text-lg font-bold text-gray-600">비밀번호</label>
            <div class="mt-1 p-3 border-2 rounded-md">
              ********
            </div>
          </div>
          <div>
            <label class="block text-lg font-bold text-gray-600">휴대폰번호</label>
            <div class="mt-1 p-3 border-2 rounded-md">
              {{ userInfo.phone }}
            </div>
          </div>
          <div>
            <label class="block text-lg font-bold text-gray-600">등급</label>
            <div class="mt-1 p-3 border-2 rounded-md">
              {{ userInfo.grade }}
            </div>
          </div>
        </div>
        <button @click="editProfile" class="bg-black text-white px-4 py-2 rounded-md mt-4 ml-auto hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800">
          프로필 수정
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userInfo: {
          nickname: 'JohnDoe',
          email: 'john.doe@example.com',
          address: '123 Main St, City, Country',
          phone: '010-1234-5678',
          grade: 'Gold',
        },
      };
    },
    methods: {
      editProfile() {
        // 프로필 수정 로직을 추가
        console.log('프로필 수정 버튼 클릭');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS 클래스를 직접 사용하거나 추가적인 스타일을 작성할 수 있습니다. */
  </style>
  