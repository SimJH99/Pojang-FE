<template>
    <ul>
        <li v-for="review in reviewList" :key="review.id" class="review-item mt-4 border-b pb-4">
            <div class="review-author text-lg font-bold">{{ review.nickname }}</div>
            <div class="review-rating text-sm text-yellow-500 mt-1">별점: {{ review.rating }}</div>
            <img v-if="review.imageUrl" :src="review.imageUrl" alt="리뷰 이미지" class="menu-img w-16 h-16 object-cover rounded-lg">
            <div class="review-content text-sm text-gray-500 mt-2">{{ review.contents }}</div>
        </li>
    </ul>
</template>

<script>
import axios from 'axios';
export default {
    props:['storeId'],
    data () {
        return {
            reviewList: [],
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
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.storeId}/reviews`);
            this.reviewList = response.data.result;
        }catch(error) {
            console.log(error);
        }
    },
    mounted() {

    }, 
    methods: {
        getImage(id) {
            return `${process.env.VUE_APP_API_BASE_URL}/api/orders/${id}/reviews/image`;
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