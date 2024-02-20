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
            <p class="text-gray-800 font-bold mt-2">총 주문 금액: {{ order.totalPrice }}원</p>
          </div>
        </div>
        <div v-else class="bg-white p-4 rounded-md">
          <p>주문 내역이 없습니다.</p>
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
          this.orders = response.data.result;
        } catch (error) {
          console.log(error);
        }
      },
      getImage(id) {
        return `${process.env.VUE_APP_API_BASE_URL}/api/stores/${id}/image`;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS 클래스를 직접 사용하거나 추가적인 스타일을 작성할 수 있습니다. */
  </style>
  