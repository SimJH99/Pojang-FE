<template>
    <li v-for="review in reviewList" :key="review.id" class="review-item mt-4 border-b pb-4">
        <div class="review-author text-lg font-bold">{{ review.nickname }}</div>
        <div class="review-rating text-sm text-yellow-500 mt-1">별점: {{ review.rating }}</div>
        <div class="review-content text-sm text-gray-500 mt-2">{{ review.contents }}</div>
    </li>
</template>

<script>
import axios from 'axios';
export default {
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
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/1/reviews`);
            this.reviewList = response.data.result;
        }catch(error) {
            console.log(error);
        }
    },
    mounted() {
        // 무한 스크롤 : scroll 동작이 발생할 때마다 scrollPagination함수가 호출됨
        // window.addEventListener('scroll', this.scrollPagination);
    }, 
    // methods: {
    //     // async loadReview() {
    //     //     this.isLoading = true;
    //         // try {
    //             // params 객체 생성 : url 추가 시 자동으로 파라미터 형식으로 보내짐
    //             // const params = {
    //             //     page: this.currentPage,
    //             //     size: this.pageSize,
    //             //     // [] : [] 안의 값을 꺼냄
    //             //     // [this.searchType]: this.serchValue
    //             // }
                
    //             // console.log("data호출");
    //             // const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/1/reviews`);
    //             // const addreviewList = response.data.map(review=>({...review, quantity:1}));
    //             // 마지막 페이지인지 확인 - 더 이상 api호출 안하도록
    //             // if(addreviewList.length < this.pageSize) {
    //             //     this.isLastPage = true;
    //             // }
    //         //     this.reviewList = response.data;
    //         //     // this.reviewList = [...this.reviewList, ...addreviewList];
    //         // }catch(error) {
    //         //     console.log(error);
    //         // }
    //         // this.isLoading = false;
    //     }
    // }
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