<template>
    <div class="min-h-screen flex bg-gray-100">

        <!-- 오른쪽 컨텐츠 영역 -->
        <div class="w-5/6 p-8">
            <h2 class="text-3xl font-semibold mb-6 text-gray-800">주문표</h2>
            <div v-if="getCartMenus.length > 0" class="bg-white p-4 rounded-md">
                <ul>
                    <li class="mb-3" v-for="menu in getCartMenus" :key="menu.id">
                        <ul>
                            <h3 class="text-xl font-semibold text-gray-800 mb-2"> {{ menu.name }}</h3>
                            <li>
                                수량: {{ menu.quantity }}개
                            </li>
                            <li>
                                가격: {{ menu.price }}원
                            </li>
                        </ul>
                    </li>
                    <p class="text-gray-800 font-bold mt-5">합계 금액: {{ getTotalPrice }}원</p>
                </ul>
                <div class="mt-4">
                    <a href="/order" class="bg-green-500 text-white p-2 rounded-md mr-3">주문하기</a>
                    <button @click="clearCart" class="bg-blue-500 text-white p-2 rounded-md">장바구니 비우기</button>
                </div>
            </div>
            <div v-else class="bg-white p-4 rounded-md">
                <p>장바구니가 비었습니다.</p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import axios from 'axios';

export default {
    computed: {
        ...mapGetters(['getCartMenus', 'getTotalQuantity', 'getTotalPrice'])
    },

    methods: {
        ...mapActions(['clearCart']),
        async placeOrder(){
            try {
                const orderMenus = this.getCartMenus.map(menu => {
                    return {name: menu.name, quantity: menu.quantity, price: menu.price};
                })
                if (this.getTotalQuantity < 1){
                    alert("장바구니에 담긴 메뉴가 없습니다.");
                    return;
                }
                if (!confirm(`${this.getTotalQuantity}개의 메뉴를 주문하시겠습니까?`)){
                    console.log("주문이 취소되었습니다.");
                    alert("주문이 취소되었습니다.");
                    return;
                }
                const token = localStorage.getItem('token');
                if (token == null){
                    alert("로그인이 필요합니다.");
                    this.$router.push({name : "Login"});
                    return;
                }
                const headers = {Authorization: `Bearer ${token}`};
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/stores/5/orders`, orderMenus, {headers});
                alert("주문이 완료되었습니다.");
                // this.$store.commit('clearCart');
                this.$store.dispatch('clearCart');
            } catch(error){
                const error_message = error.response.data.error_message;
                if (error_message){
                    console.log(error_message);
                    alert(error_message);
                } else {
                    console.log(error);
                }
            }
        },
        clearCart(){
            // this.$store.commit('clearCart');
            this.$store.dispatch('clearCart');
            alert("장바구니가 초기화 되었습니다.");
            window.location.reload();
        }
    }
}

</script>
