<template>
    <li v-for="menu in menuList" :key="menu.id" class="menu-item flex mt-4 border-b pb-4" @click="openModal(menu)">
        <img :src="getImage(menu.id)" alt="메뉴 이미지" class="menu-img w-16 h-16 object-cover rounded-lg">
        <div class="menu-info ml-4">
            <h4 class="menu-name text-lg font-bold">{{ menu.menuName }}</h4>
            <div class="menu-price text-sm text-gray-500 mt-1">{{ menu.price }}원</div>
        </div>
    </li>

    <div v-if="isModalOpen" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 opacity-75" @click="closeModal"></div>
            </div>

            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                            {{ selectedMenu.menuName }}
                        </h3>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">
                                Options:
                                <ul>
                                    <li v-for="menuOptionGroup in menuOptionGroups" :key="menuOptionGroup.id">
                                        {{ menuOptionGroup.name }}:
                                        <ul>
                                            <li v-for="option in menuOptionGroup.menuOptions" :key="option.id">
                                                {{ option.name }}: {{ option.price }}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </p>
                        </div>
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
    data () {
        return {
            menuList: [],
            menuOptionGroups: [],
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
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/1/menus`);
            this.menuList = response.data.result;
        }catch(error) {
            console.log(error);
        }
    },
    mounted() {
        
        // 무한 스크롤 : scroll 동작이 발생할 때마다 scrollPagination함수가 호출됨
        // window.addEventListener('scroll', this.scrollPagination);
    }, 
    methods: {
        getImage(id) {
            return `${process.env.VUE_APP_API_BASE_URL}/api/stores/1/menus/${id}/image`;
        },
        async openModal(menu) {
            this.selectedMenu = menu;
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/1/menus/${menu.id}`);
            this.menuOptionGroups = response.data.result.menuOptionGroups;
            this.isModalOpen = true;
        },
        closeModal() {
            this.selectedMenu = null;
            this.isModalOpen = false;
            this.menuOptionGroups = [];
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
  }
</style>