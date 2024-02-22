<template>
    <div class="min-h-screen flex bg-gray-100">

        <!-- 오른쪽 컨텐츠 영역 -->
        <div class="w-5/6 p-8 flex flex-col">
            <div v-if="orders.length > 0" class="grid grid-cols-1 gap-4">
                <div class="bg-white rounded-md shadow-md p-6" v-for="order in orders" :key="order.orderId">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">주문 번호: {{ order.orderId }}</h3>
                    <p class="text-gray-600">주문 일자: {{ order.orderDateTime }}</p>
                    <p class="text-gray-600">고객명: {{ order.customer }}</p>
                    <p class="text-gray-600">고객 전화번호: {{ order.phoneNumber }}</p>
                    <p class="text-gray-600">요청 사항: {{ order.requirement }}</p>
                    <p class="text-gray-600">주문 상태: {{ order.orderStatus }}</p>
                    <p class="text-gray-600 mt-5">메뉴:
                    <ul>
                        <li v-for="(quantity, menuName) in order.orderMenuInfo" :key="menuName">
                            {{ menuName }} (수량: {{ quantity }})
                        </li>
                    </ul>
                    </p>
                    <p class="text-gray-600 mt-5">메뉴 옵션:
                    <ul>
                        <li class="mt-3" v-for="(options, menuName) in order.orderMenuOptions" :key="menuName">
                            {{ menuName }}:
                            <ul>
                                <li v-for="option in options" :key="option">{{ option }}</li>
                            </ul>
                        </li>
                    </ul>
                    </p>
                    <p class="text-gray-800 font-bold mt-2">총 주문 금액: {{ order.totalPrice }}원</p><br />
                    <div>
                        <button v-if="order.orderStatus == '접수대기'" @click="acceptOrder(order.orderId)" class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">접수</button>
                        <button v-if="order.orderStatus == '접수대기'" @click="cancelOrder(order.orderId)" class="bg-red-500 text-white px-4 py-2 rounded-md mr-2">취소</button>
                        <button v-if="order.orderStatus == '주문접수'" @click="confirmOrder(order.orderId)" class="bg-green-500 text-white px-4 py-2 rounded-md">확정</button>
                    </div>
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
    props: ['storeId'],
    data() {
        return {
            orders: [],
        };
    },
    async created() {
        this.fetchOrders();
    },
    methods: {
        async fetchOrders() {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.storeId}/orders`, { headers });
                this.orders = response.data.result;
                console.log(this.orders);
            } catch (error) {
                console.log(error.response.data.message);
                alert(error.response.data.message);
            }
        },
        async cancelOrder(orderId){
            try{
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.storeId}/orders/${orderId}/store-cancel`, { headers });
                console.log(response);
                alert(response.data.message);
                window.location.reload();
            } catch(error){
                console.log(error.response.data.message);
                alert(error.response.data.message);
            }   
        },
        async acceptOrder(orderId){
            try{
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.storeId}/orders/${orderId}/store-accept`, { headers });
                console.log(response);
                alert(response.data.message);
                window.location.reload();
            } catch(error){
                console.log(error.response.data.message);
                alert(error.response.data.message);
            }
        },
        async confirmOrder(orderId){
            try{
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.storeId}/orders/${orderId}/store-confirm`, { headers });
                console.log(response);
                alert(response.data.message);
                window.location.reload();
            } catch(error){
                console.log(error.response.data.message);
                alert(error.response.data.message);
            }
        },
    },
};
</script>