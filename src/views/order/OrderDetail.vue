<template>
  <div class="container min-w-full  flex  items-center border-t-[3px]  ">
    <div class="w-1/4 p-6 bg-white rounded-md shadow-md border-3 mt-4 border-gray-800">
      <h2 class="text-2xl font-semibold mb-4">주문 정보 입력</h2>
      <div class="mb-4">
        <label class="block text-sm font-semibold text-gray-800 mb-1">결제수단</label>
        <select v-model="payment" class="mt-1 p-2 w-full border rounded-md">
          <option value="cash">현금</option>
          <option value="card">카드</option>
          <option value="kakao">카카오 페이</option>
          <option value="naver">네이버 페이</option>
          <option value="toss">토스 페이</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="requirement" class="block text-sm font-semibold text-gray-800 mb-1">주문 시 요청 사항</label>
        <input v-model="requirement" id="requirement" type="text" class="mt-1 p-2 w-full border rounded-md">
      </div>
      <button @click="executeOrder" class="bg-blue-500 text-white p-2 rounded-md">결제하기</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  computed: {
    ...mapGetters(['getCartMenus', 'getTotalQuantity', 'getTotalPrice', 'getStoreId'])
  },
  data() {
    return {
      payment: '',
      requirement: '',
    };
  },
  methods: {
    async executeOrder() {
      if (!this.payment) {
        alert('결제수단을 선택해주세요!');
        return;
      }
      try {
        const storeId = localStorage.getItem('storeId');
        const selectedMenuDto = this.getCartMenus.map(menu => {
          return {
            menuId: menu.menuId,
            quantity: menu.menuQuantity,
            selectedMenuOptions: menu.selectedMenuOptions
          }
        })
        const orderDto = {
          payment: this.payment,
          requirement: this.requirement,
          totalPrice: this.getTotalPrice,
          selectedMenus: selectedMenuDto
        }
        const token = localStorage.getItem('token');
        if (token == null) {
          alert("로그인이 필요합니다.");
          this.$router.push({ name: "Login" });
          return;
        }
        try{
          const storeId = localStorage.getItem('storeId');
          const selectedMenuDto = this.getCartMenus.map(menu => {
              return {
                  menuId: menu.menuId,
                  quantity: menu.menuQuantity,
                  selectedMenuOptions: menu.selectedMenuOptions
              }
          })
          const orderDto = {
              payment: this.payment,
              requirement: this.requirement,
              totalPrice: this.getTotalPrice,
              selectedMenus: selectedMenuDto
          }
          const token = localStorage.getItem('token');
          if (token == null){
              alert("로그인이 필요합니다.");
              this.$router.push({name : "Login"});
              return;
          }
          const headers = {Authorization: `Bearer ${token}`};
          if (!confirm("정말로 주문하시겠습니까?")){
            alert("주문 취소");
            return;
          }
          console.log(orderDto)
          await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${storeId}/orders`, orderDto, {headers});
          alert("주문 완료");
          this.$store.dispatch('clearCart');
          window.location.href = "/";
        } catch(error){
          console.log(error);
          alert(error.response.data.message);
        }
        console.log(orderDto)
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${storeId}/orders`, orderDto, { headers });
        alert("주문 완료");
        this.$store.dispatch('clearCart');
        window.location.href = "/";
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  }
}

</script>

<style scoped>
form {
  width: 100%;
  /* 폼의 너비를 100%로 설정하여 화면에 꽉 차도록 함 */
  max-width: 450px;
  /* 최대 너비를 지정하여 너무 커지지 않도록 함 */
  margin: 0 auto;
  /* 가운데 정렬을 위해 margin을 auto로 설정 */
}
</style>