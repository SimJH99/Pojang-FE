<template>
    <li v-for="menu in menuList" :key="menu.id" class="menu-item flex mt-4 border-b pb-4">
        <img :src="getImage(menu.id)" alt="메뉴 이미지" class="menu-img w-16 h-16 object-cover rounded-lg">
        <div class="menu-info ml-4">
          <h4 class="menu-name text-lg font-bold">{{ menu.menuName }}</h4>
          <div class="menu-price text-sm text-gray-500 mt-1">{{ menu.price }}원</div>
        </div>
      </li>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            menuList: [],
             // 페이징 처리
             pageSize: 10, // 20개씩 보여줌
            currentPage: 0,
            searchType: 'optional',
            searchValue: '',
            isLastPage: false,
            isLoading: false,
        }
    },
    async created() {
        try {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/1/menus`);
            this.menuList = response.data.result;
        }catch(error) {
            console.log(error);
        }
    },
    mounted() {
        
        // 무한 스크롤 : scroll 동작이 발생할 때마다 scrollPagination함수가 호출됨
        // window.addEventListener('scroll', this.scrollPagination);
    }, 
    methods: {
        getImage(id) {
            return `${process.env.VUE_APP_API_BASE_URL}/api/stores/1/menus/${id}/image`;
        }
    }
}
</script>

<style>
.review-item {
    /* 리뷰 아이템 스타일 */
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    background-color: #f8f8f8;
  }
</style>