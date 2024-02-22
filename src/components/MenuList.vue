<template>
    <li v-for="menu in menuList" :key="menu.id" class="menu-item flex mt-4 border-b pb-4" @click="openModal(menu)">
        <img :src="getImage(menu.id)" alt="메뉴 이미지" class="menu-img w-16 h-16 object-cover rounded-lg">
        <div class="menu-info ml-4">
            <h4 class="menu-name text-lg font-bold">{{ menu.name }}</h4>
            <div class="menu-price text-sm text-gray-500 mt-1">{{ menu.price }}원</div>
        </div>
    </li>

    <div v-if="isModalOpen" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75" @click="closeModal"></div>
            </div>
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h2 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                {{ selectedMenu.name }}
                            </h2>
                            <h2 class="text-sm text-gray-500 mt-3 ml-2">소개: {{ selectedMenu.info }}</h2>
                            <div class="mt-4">
                                <div class="text-sm text-gray-500">
                                    <h3>옵션 선택</h3>
                                    <ul>
                                        <li v-for="menuOptionGroup in menuOptionGroups" :key="menuOptionGroup.id">
                                            <br>
                                            {{ menuOptionGroup.name }}
                                            <ul>
                                                <li v-for="option in menuOptionGroup.menuOptions" :key="option.id">
                                                    <input type="checkbox" v-model="selectedMenuOptions[option.id]" @change="handleCheckboxChange($event, option.price)"/>
                                                    {{ option.name }}: {{ option.price }}
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mt-5">
                                주문 수량: <input type="number" v-model="selectedMenu.quantity" min="1" @change="handleQuantityChange" style="width: 60px;"/>
                            </div>
                            <div class="mt-5">
                                총 주문 금액: {{ totalPrice }}원
                            </div>
                        </div>
                    </div>
                    <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="addCart"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                            장바구니 담기
                        </button>
                        <button type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="closeModal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
export default {
    props:['storeId'],
    data() {
        return {
            menuList: [],
            menuOptionGroups: [],
            menuOptions: [],
            selectedMenuOptions: {},
            prevSelectedMenuOptions: {},
            selectedMenuOptionGroup: null,
            totalPrice: 0, // 총 주문 금액 추가
            // 페이징 처리
            pageSize: 10, // 20개씩 보여줌
            currentPage: 0,
            searchType: 'optional',
            searchValue: '',
            isLastPage: false,
            isLoading: false,
            isModalOpen: false,
            selectedMenu: null,
        }
    },
    async created() {
        try {
            console.log("this.storeId : " + this.storeId)
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.storeId}/menus`);
            this.menuList = response.data.result.map(menu => ({...menu, quantity: 1}));
            console.log(this.menuList)
        } catch (error) {
            console.log(error);
        }
    },
    mounted() {

        // 무한 스크롤 : scroll 동작이 발생할 때마다 scrollPagination함수가 호출됨
        // window.addEventListener('scroll', this.scrollPagination);
    },
    methods: {
        ...mapActions(['addToCart']),
        handleCheckboxChange(event, price){
            if (event.target.checked){
                this.totalPrice += price;
            } else {
                this.totalPrice -= price;
            }
            
        },
        handleQuantityChange(){
            this.totalPrice = this.selectedMenu.price * this.selectedMenu.quantity;
        },
        addCart(){
            const options = Object.keys(this.selectedMenuOptions)
            .filter(key => this.selectedMenuOptions[key] === true)
            .map(key => parseInt(key));
            try{
                const token = localStorage.getItem('token');
                if (token == null){
                    alert("로그인이 필요합니다.");
                    this.$router.push({name : "Login"});
                    return;
                }
                const orderInfo = {
                    id : this.selectedMenu.id,
                    storeId : this.storeId,
                    name: this.selectedMenu.name,
                    quantity: this.selectedMenu.quantity,
                    price: this.totalPrice,
                    // selectedMenuOptions: this.selectedMenuOptions,
                    selectedMenuOptions: options,
                };
                console.log(orderInfo);
                
                if (confirm("메뉴를 장바구니에 담으시겠습니까?")){
                    this.$store.dispatch('addToCart', orderInfo);
                    console.log("store 진입!");
                    alert("장바구니에 메뉴를 담았습니다.");
                    window.location.reload();
                }
            } catch(error){
                const errorMessage = error.response.data.message;
                if (errorMessage){
                    console.log(errorMessage);
                    alert(errorMessage);
                }
            }
        },
        getImage(menuId) {
            return `${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.storeId}/menus/${menuId}/image`;
        },
        async openModal(menu) {
            this.selectedMenu = menu;
            this.totalPrice = this.selectedMenu.price;
            this.selectedMenuOptions = {};
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.storeId}/menus/${this.selectedMenu.id}`);
            console.log(response.data.result);
            this.menuOptionGroups = response.data.result.menuOptionGroups;
            this.isModalOpen = true;
        },
        closeModal() {
            this.selectedMenu = null;
            this.isModalOpen = false;
            this.selectedMenuOptionGroup = {};
            this.menuOptionGroups = [];
        },
        async fetchMenu() {
            
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
}</style>