<template>
  <div class="text-center">
    <!-- 검색 부분 -->
    <div class="p-24 mx-auto">
      <!-- style="background-image:url('https://media.istockphoto.com/id/1248701474/ko/%EC%82%AC%EC%A7%84/%EB%82%98%EB%AC%B4-%ED%91%9C%EB%A9%B4%EC%97%90-%EC%A0%93%EA%B0%80%EB%9D%BD%EA%B3%BC-%EB%A9%B4-%EB%83%85%ED%82%A8-%EA%B7%BC%EC%B2%98-%ED%95%9C%EA%B5%AD-%EC%A0%84%ED%86%B5-%EC%9A%94%EB%A6%AC%EC%9D%98-%EC%B5%9C%EA%B3%A0-%EB%B3%B4%EA%B8%B0.jpg?s=1024x1024&w=is&k=20&c=kiJ989Hp5xZ8au2U12GoKDMQLvklwlTMak6j7p_p2NU='); background-size: cover; background-position: center;" -->
      <div class="p-8 rounded-md">
        <div class="flex items-center justify-center"> <!-- Add justify-center -->
          <button class="p-2 bg-white rounded-md mr-1 text-rose-600">※</button>
          <input type="text" class="p-2 border rounded-l-md w-[30%]" placeholder="검색어를 입력하세요" />
          <button class="p-2 bg-blue-500 text-white rounded-r-md focus:outline-none">
            검색
          </button>
        </div>
      </div>
    </div>
    <!-- 카테고리 부분 -->
    <div class="grid grid-cols-4 gap-4 p-12 mt-6">
      <div v-for="category in categories" :key="category.id"
        class="category-item p-12 bg-gray-200 rounded-md shadow-md transition duration-300 hover:bg-gray-300">
        <h1 class="text-center">{{ category.name }}</h1>
      </div>
    </div>
  </div>
</template>


<script setup>
const categories = [
  { id: 1, name: '오늘의 할인' },
  { id: 2, name: '전체보기' },
  { id: 3, name: '1인분 주문' },
  { id: 4, name: '프랜차이즈' },
  { id: 5, name: '치킨' },
  { id: 6, name: '피자/양식' },
  { id: 7, name: '중국집' },
  { id: 8, name: '한식' },
  { id: 9, name: '일식/돈까스' },
  { id: 10, name: '족발/보쌈' },
  { id: 11, name: '야식' },
  { id: 12, name: '분식' },
];
</script>