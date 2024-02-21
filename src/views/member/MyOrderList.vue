<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- 왼쪽 사이드바 -->
    <div class="w-1/6 bg-white p-4">
      <ul>
        <li class="text-lg font-bold mb-2"><a href="/my-info">내 정보</a></li>
        <li class="text-lg font-bold mb-2"><a href="/my-orders">주문 내역</a></li>
        <li class="text-lg font-bold mb-2"><a href="/my-favorite">찜 목록</a></li>
        <li class="text-lg font-bold mb-2"><a href="/my-review">리뷰 목록</a></li>
        <li class="text-lg font-bold mb-2"><a href="/my-info/update">정보 수정</a></li>
        <!-- 추가적인 카테고리 항목들을 필요에 따라 나열하세요 -->
      </ul>
    </div>

    <!-- 오른쪽 컨텐츠 영역 -->
    <div class="w-5/6 p-8 flex flex-col">
      <h2 class="text-3xl font-semibold mb-6 text-gray-800">주문 내역</h2>
      <div v-if="orders.length > 0" class="grid grid-cols-1 gap-4">
        <div v-for="order in orders" :key="order.id" class="bg-white rounded-md shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">주문 번호: {{ order.orderId }}</h3>
          <p class="text-gray-600">가게명: {{ order.store }}</p>
          <p class="text-gray-600"><img :src="getImage(order.storeId)" class="h-24 w-auto mt-2"></p>
          <p class="text-gray-600">주문 상태: {{ order.orderStatus }}</p>
          <p class="text-gray-600">주문 일자: {{ order.orderDateTime }}</p>
          <p class="text-gray-600">메뉴:
            <ul>
              <li v-for="(quantity, menuName) in order.orderMenuInfo" :key="menuName">
                {{ menuName }} (수량: {{ quantity }})
              </li>
            </ul>
          </p>
          <p class="text-gray-600">메뉴 옵션:
            <ul>
              <li v-for="(options, menuName) in order.orderMenuOptions" :key="menuName">
                {{ menuName }}:
                <ul>
                  <li v-for="option in options" :key="option">{{ option }}</li>
                </ul>
              </li>
            </ul>
          </p>
          <p class="text-gray-800 font-bold mt-2">총 주문 금액: {{ order.totalPrice }}원</p><br/>
          <button v-if="!order.hasReview" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" @click="openModal(order.orderId)">리뷰 작성</button>  
        </div>
      </div>
      <div v-else class="bg-white p-4 rounded-md">
        <p>주문 내역이 없습니다.</p>
      </div>
    </div>
  </div>

  <!-- 리뷰작성 - 모달 -->
  <div v-if="isModalOpen" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75" @click="closeModal"></div>
      </div>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h1 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">리뷰 작성</h1><br/>
                <form @submit.prevent="submitReview">
                <label>
                    별점:        
                    <span
                      v-for="star in 5"
                      :key="star"
                      @click="rating = star"
                      :class="star <= rating ? 'text-yellow-500' : 'text-gray-300'"
                      role="button" tabindex="0"
                      style="font-size: 2em; background: none; border: none;"
                    >
                      ★
                    </span>      
                </label><br/>
                <label>
                    내용:
                    <textarea v-model="contents"></textarea>
                </label><br/>
                <label>
                    이미지:
                    <input type="file" accept="image/*" @change="onFileChange">
                </label><br/>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">제출</button>
                </form>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" @click="closeModal">
            Close
            </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      rating: 0,
      contents: "",
      image: null,
      isModalOpen: false,
      orderId: null,
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/members/orders`, { headers });
        const orders = response.data.result;

        for(let order of orders) {
          const reviewResponse = await this.checkReview(order.orderId);
          // 리뷰가 있으면 true, 없으면 false
          order.hasReview = !!reviewResponse;
        }
        this.orders = orders;
      } catch (error) {
        console.log(error);
      }
    },
    getImage(id) {
      return `${process.env.VUE_APP_API_BASE_URL}/api/stores/${id}/image`;
    },
    openModal(orderId) {
      this.orderId = orderId;
      this.isModalOpen = true;
    },
    closeModal() {
      this.orderId = null;
      this.isModalOpen = false;
    },
    onFileChange(event) {
      this.image = event.target.files[0];
      console.log(this.image);
    },
    async checkReview(orderId) {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/orders/${orderId}/reviews`, { headers });
      return response.data;
    },
    async submitReview() {
      if (!this.contents) {
          alert('내용을 입력하세요.');
          return;
      }
      try{
        // multi-part formdata형식의 경우 new FormData를 통해 객체 생성 (json형태인 memberCreate랑 비교해서 보기)
        const registerData = new FormData();
        registerData.append("rating", this.rating);
        registerData.append("contents", this.contents);
        if(this.image){
          registerData.append("image", this.image);
        }
        const token = localStorage.getItem('token');
        const headers = {Authorization: `Bearer ${token}`} 
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/orders/${this.orderId}/reviews`, registerData, {headers});
        alert("리뷰작성 완료");
        // window.location.reload();
      }catch(error){
          alert('리뷰작성 실패');
      }
    }
  },
};
</script>

