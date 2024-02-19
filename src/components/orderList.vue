<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- 왼쪽 사이드바 -->
    <div class="w-1/6 bg-white p-4">
      <h3 class="text-lg font-bold mb-2">내비게이션</h3>
      <ul>
        <li><router-link to="/profile">프로필 수정</router-link></li>
        <li><router-link to="/order-history">주문 내역</router-link></li>
        <!-- 추가적인 내비게이션 항목들을 필요에 따라 나열하세요 -->
      </ul>
    </div>

    <!-- 오른쪽 컨텐츠 영역 -->
    <div class="w-5/6 p-8">
      <h2 class="text-3xl font-semibold mb-6 text-gray-800">주문 내역</h2>
      <div v-if="orders.length > 0" class="bg-white p-4 rounded-md">
        <ul>
          <li v-for="order in orders" :key="order.id">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">주문 번호: {{ order.id }}</h3>
            <p class="text-gray-600">주문일자: {{ order.date }}</p>
            <ul>
              <li v-for="item in order.items" :key="item.id">
                {{ item.name }} - 수량: {{ item.quantity }} - 가격: {{ item.price }}원
              </li>
            </ul>
            <p class="text-gray-800 font-bold mt-2">총 주문 금액: {{ order.totalPrice }}원</p>
          </li>
        </ul>
      </div>
      <div v-else class="bg-white p-4 rounded-md">
        <p>주문 내역이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          id: 1,
          date: '2022-03-01',
          items: [
            { id: 1, name: '상품1', quantity: 2, price: 5000 },
            { id: 2, name: '상품2', quantity: 1, price: 8000 },
          ],
          totalPrice: 18000,
        },
        // 추가적인 주문 내역 데이터를 필요에 따라 나열하세요
      ],
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS 클래스를 직접 사용하거나 추가적인 스타일을 작성할 수 있습니다. */
</style>
