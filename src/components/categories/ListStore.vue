<template>
  <div class="w-2/3 mx-auto grid grid-cols-2 mb-3">
    <div v-for="store in filteredStores" :key="store.id"
      class="p-4 border border-gray-300 rounded-md flex items-center mx-2 my-1">
      <!-- <img :src="getImage(store.id)" class="w-70 h-70 object-cover mb-2 rounded-md mr-4"> -->
      <div>
        <p class="text-gray-500">{{ store.name }}</p>
        <p class="text-gray-500">{{ store.status }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref, onMounted, watchEffect } from "vue";
import axios from 'axios';

const props = defineProps({
  category: String,
  searchName: String
});

const stores = ref([]); // 상점 데이터를 담을 ref
const filteredStores = ref([]); // 필터링된 상점 데이터를 담을 ref

onMounted(async () => {
  fetchData(); // 초기 데이터 로딩
});

// props의 변경을 감지하고 filteredStores를 업데이트
watchEffect(() => {
  fetchData();
});

async function fetchData() {
  try {
    const params = { 
      name: props.searchName,
      category: props.category
    };
    const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/`, { params });
    stores.value = response.data.result;
    filteredStores.value = stores.value;
  } catch (error) {
    console.error('데이터 조회 중 에러 발생:', error);
  }
}
</script>