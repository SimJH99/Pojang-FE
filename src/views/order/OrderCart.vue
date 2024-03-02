<template>
    <div class="min-h-screen flex bg-gray-100">
        <!-- 오른쪽 컨텐츠 영역 -->
        <div class="w-5/6 p-8 mx-auto">
            <h2 class="text-3xl font-semibold mb-6 text-gray-800">주문표</h2>
            <div v-if="getCartMenus.length > 0" class="bg-white p-4 rounded-md">
                <ul>
                    <li class="mb-3 p-4 bg-white rounded-lg shadow-md" v-for="menu in getCartMenus" :key="menu.menuId">
                        <ul>
                            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ menu.menuName }}</h3>
                            <li class="text-gray-600 mb-2">메뉴 가격 - <span class="font-medium">{{ menu.menuPrice }}원</span></li>
                            <li class="text-gray-600 mb-2">수량 - <span class="font-medium">{{ menu.menuQuantity }}개</span></li>
                            <li class="text-gray-600 mb-2" v-if="menu.selectedMenuOptions.length > 0">
                                옵션
                                <ul class="ml-4">
                                    <li class="text-sm text-gray-500" v-for="option in menu.selectedMenuOptions" :key="option.id">
                                        {{ option.name }} - {{ option.price }}원
                                    </li>
                                </ul>
                            </li>
                            <li class="text-gray-600">
                                총 가격 - <span class="font-medium">{{ menu.totalPrice }}원</span>
                            </li>
                        </ul>
                    </li>
                    <p class="text-gray-800 font-bold mt-5 mb-3">합계 금액 {{ getTotalPrice }}원</p>
                </ul>
                <div class="mt-4" v-if="orderButton === 1">
                    <button @click="orderCart" class="bg-green-500 text-white p-2 mr-3 rounded-md">주문하기</button>
                    <button @click="clearCart" class="bg-blue-500 text-white p-2 rounded-md">장바구니 비우기</button>
                </div>
                <div v-if="orderButton === 2">
                    <OrderDetail />
                </div>
            </div>
            <div v-else class="bg-white p-4 rounded-md">
                <p>장바구니가 비었습니다.</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import OrderDetail from '@/views/order/OrderDetail.vue';
export default {
    computed: {
        ...mapGetters(['getCartMenus', 'getTotalQuantity', 'getTotalPrice'])
    },
    components: {
        OrderDetail
    },
    data() {
        return {
            orderButton: 1,
        };
    },
    methods: {
        ...mapActions(['clearCart']),
        orderCart() {
            this.orderButton = 2;
        },
        clearCart() {
            // this.$store.commit('clearCart');
            this.$store.dispatch('clearCart');
            alert("장바구니가 초기화 되었습니다.");
            window.location.reload();
        }
    }
}
</script>