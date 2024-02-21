<!-- src/components/SignUp.vue -->
  <template>
    <div class="container bg-gray-100 min-w-full min-h-screen flex justify-center items-center">
        <div class="max-w-lg w-full p-6 bg-white rounded-md shadow-md border-3 border-gray-800">
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
      <OrderCart
    />
    </div>
  </template>
  
  <script>
  import {mapGetters} from 'vuex';
  import OrderCart from '@/views/order/OrderCart.vue';
  import axios from 'axios'; 
  export default {
    components: {
        OrderCart
    },
    computed: {
        ...mapGetters(['getCartMenus', 'getTotalQuantity', 'getTotalPrice'])
    },
    data() {
      return {
        payment: '',
        requirement: '',
      };
    },
    methods: {
      async executeOrder() {
        try{
            const selectedMenuDto = this.getCartMenus.map(menu => {
                return {
                    menuId: menu.id,
                    quantity: menu.quantity,
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
            console.log(orderDto);
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/stores/5/orders`, orderDto, {headers});
            alert("주문 완료");
            window.location.reload();
          } catch(error){
            console.log(error);
            alert(error)
        }
        // 여기에 폼 제출 로직 추가
        console.log('폼이 제출되었습니다.');
      },
    }
}

</script>

<style scoped>
.container {
  background-color: #edf2f7; /* 컨테이너의 배경색 */
}

form {
  width: 100%; /* 폼의 너비를 100%로 설정하여 화면에 꽉 차도록 함 */
  max-width: 450px; /* 최대 너비를 지정하여 너무 커지지 않도록 함 */
  margin: 0 auto; /* 가운데 정렬을 위해 margin을 auto로 설정 */
}
</style>