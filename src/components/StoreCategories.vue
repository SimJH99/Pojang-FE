<template>
  <div>
    <!-- 검색 부분 -->
    <div class="p-8 mx-auto h-full"
      :style="{ backgroundImage: `url(${require('@/assets/searchBackground.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
      <div class="p-8 rounded-md h-full">
        <div class="flex items-center justify-center h-full">
          <input v-model="searchInput" type="text" class="p-2 border rounded-l-md w-[35%]" placeholder="가게명 입력 해주세요" />
          <button @click="performSearch" class="p-2 bg-blue-500 text-white rounded-r-md focus:outline-none">
            검색
          </button>
        </div>
      </div>
    </div>
    <div class="flex overflow-x-auto justify-center p-4">
      <div v-for="category in categories" :key="category.id">
        <button :class="{
          'text-gray-800 font-semibold py-2 px-4 border border-gray-300 bg-blue-500': selectedCategory === category.category,
          'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300': selectedCategory !== category.category
        }" @click="selectCategory(category)">
          {{ category.id === 1 ? '전체보기' : category.category }}
        </button>
      </div>
    </div>
    <ListStore :category="selectedCategory" :searchName = "searchName"  />
  </div>
</template>

<script setup>
// import HomeSearch from '@/components/HomeSearch.vue';
import ListStore from '@/components/categories/ListStore.vue';
import { ref } from 'vue';


const categories = [
  { id: 1, category: '' },
  { id: 2, category: '치킨' },
  { id: 3, category: '피자' },
  { id: 4, category: '중식' },
  { id: 5, category: '한식' },
  { id: 6, category: '일식' },
  { id: 7, category: '야식' },
  { id: 8, category: '양식' },
  { id: 9, category: '분식' },
];
// 상태 관리
const searchName = ref('');
let selectedCategory = ref(null);
const searchInput = ref('');

const selectCategory = (category) => {
  selectedCategory.value = category.category;
};

// 검색 수행 함수
const performSearch = () => {
  searchName.value = searchInput.value;
  alert('입력 - ' + searchName.value);
};  

</script>
