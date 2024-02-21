<template>
<div class="w-2/3 mx-auto grid grid-cols-2 mb-3" >
    <div v-for="store in filteredStores" :key="store.id"
      class="p-4 border border-gray-300 rounded-md flex items-center mx-2 my-1">
      <img :src="getImage(store.id)" class="w-[70px] h-[70px] object-cover mb-2 rounded-md mr-4">
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
const pageSize = 10;
let currentPage = 0 ;
let isLastPage = false;
let isLoading = false;
let isInitialLoad = true; // 초기 반복하는 현상 제거
const stores = ref([]); // 상점 데이터를 담을 ref
const filteredStores = ref([]); // 필터링된 상점 데이터를 담을 ref

onMounted(async () => { 
  if (isInitialLoad) {
    isInitialLoad = false;
  } else {
    fetchData();  // 초기 로드를 방지하기 위해 처음 렌더링 시 fetchData 호출 건너뛰기
  }
  window.addEventListener('scroll', scrollPagination);
});

// props의 변경을 감지하고 filteredStores를 업데이트
watchEffect(() => {
    stores.value = [];
    currentPage = 0;
    isLastPage = false;
    fetchData();
});

const scrollPagination = async () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
  if (nearBottom && !isLastPage && !isLoading){
    currentPage ++;
    await fetchData(); // 하단에 도달하면 더 많은 데이터를로드합니다.
  }
};
const getImage = (id) => {
  return `${process.env.VUE_APP_API_BASE_URL}/api/stores/${id}/image`
};

async function fetchData() {
  isLoading = true;
  try {
    const params = { 
      name: props.searchName,
      category: props.category,
      page : currentPage,
      size : pageSize
    };
    const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/`, { params });
    const addStoreList = response.data.result;
    if (addStoreList.length < pageSize) {
      isLastPage = true;
    }
    console.log("currentPage" + currentPage);
    stores.value = [...stores.value, ...addStoreList];
    filteredStores.value = stores.value;
    // stores.value = response.data.result;
    // filteredStores.value = stores.value;
    
  } catch (error) {
    console.error('데이터 조회 중 에러 발생:', error);
  }
  isLoading = false;
}
</script>