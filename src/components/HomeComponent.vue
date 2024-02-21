<template>
  <div class="text-center">
    <div class="grid grid-cols-4 gap-4 p-12 mt-6">
      <div v-for="category in categories" :key="category.id"
        class="category-item p-12 bg-gray-200 rounded-md shadow-md transition duration-300 hover:bg-gray-300">
        <router-link :to="`/categories`">
          <h1 class="text-center">{{ category.category }}</h1>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
const categories = [
  { id: 1, category: '전체보기' },
  { id: 2, category: '치킨' },
  { id: 3, category: '피자/양식' },
  { id: 4, category: '중식' },
  { id: 5, category: '한식' },
  { id: 6, category: '일식/돈까스' },
  { id: 7, category: '족발/보쌈' },
  { id: 8, category: '야식' },
  { id: 9, category: '분식' },
];
</script>