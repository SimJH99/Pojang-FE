<template>
    <div class="min-h-screen flex bg-gray-100">
        <div class="w-1/6 bg-white p-4">
            <ul>
                <li class="text-lg font-bold mb-2"><a href="/my-info-owner">내 정보</a></li>
                <li class="text-lg font-bold mb-2"><a href="/my-info-update">내 정보 수정</a></li>
                <li class="text-lg font-bold mb-2"><a href="/store-create">매장 등록</a></li>
                <li class="text-lg font-bold mb-2"><a href="/my-stores">내 매장리스트</a></li>
                <!-- 추가적인 카테고리 항목들을 필요에 따라 나열하세요 -->
            </ul>
        </div>

        <div class="w-5/6 p-8 flex flex-col">
            <!-- 내 정보 -->
            <h2 class="text-3xl font-semibold mb-6 text-gray-800">매장 정보</h2>
            <div class="flex space-x-5 text-left mt-8">
                <button @click="clickId = 1" class="hover:bg-blue-300 bg-blue-400 px-4 py-2 rounded text-white">매장 상세</button>
                <button @click="clickId = 2" class="hover:bg-red-300 bg-red-400 px-4 py-2 rounded text-white">메뉴 목록</button>
                <button @click="clickId = 3" class="hover:bg-green-300 bg-green-400 px-4 py-2 rounded text-white">주문 내역</button>
            </div>
            <hr class="my-3 border-2 border-slate-500">
            <div v-if="clickId == 3">
                <StoreOrders 
                :storeId="storeInfo.id"
                />
            </div>
            <div v-if="clickId == 2">
                <MyStoreMenuCreate 
                :storeId="storeInfo.id"
                />
            </div>
            <div v-if="clickId == 1">
                <div class="mb-4 bg-white p-4 rounded-md flex flex-col">
                    <div>
                        <label class="block text-lg font-bold text-gray-600">매장명</label>
                        <div class="mt-1 p-3 border-2 rounded-md">{{ storeInfo.name }}</div>
                    </div>
                    <div>
                        <label class="block text-lg font-bold text-gray-600">매장 이미지</label>
                        <img :src="storeInfo.imageUrl" alt="매장 이미지" class="store-img w-48 h-48 object-cover rounded-lg">
                    </div>
                    <div>
                        <label class="block text-lg font-bold text-gray-600">찜 수</label> 
                        <div class="mt-1 p-3 border-2 rounded-md">{{ storeInfo.likes }}</div>    
                    </div>
                    <div>
                        <label class="block text-lg font-bold text-gray-600">평점</label>
                        <div v-if="storeInfo.avgRating != 'NaN'" class="mt-1 p-3 border-2 rounded-md">{{ storeInfo.avgRating }}</div>
                        <div v-else class="mt-1 p-3 border-2 rounded-md">등록된 리뷰가 없습니다.</div>    
                    </div>
                    <div>
                        <label class="block text-lg font-bold text-gray-600">주소</label>
                        <div class="mt-1 p-3 border-2 rounded-md">{{ storeInfo.address }}</div>
                    </div>
                    <div>
                        <label class="block text-lg font-bold text-gray-600">사업자번호</label>
                        <div class="mt-1 p-3 border-2 rounded-md">{{ storeInfo.businessNumber }}</div>
                    </div>
                    <div>
                        <label class="block text-lg font-bold text-gray-600">카테고리</label>
                        <div class="mt-1 p-3 border-2 rounded-md">{{ storeInfo.category }}</div>
                    </div>
                    <div>
                        <label class="block text-lg font-bold text-gray-600">매장번호</label>
                        <div class="mt-1 p-3 border-2 rounded-md">{{ storeInfo.storeNumber }}</div>
                    </div>
                    <div>
                        <label class="block text-lg font-bold text-gray-600">소개 글</label>
                        <div class="mt-1 p-3 border-2 rounded-md">{{ storeInfo.introduction }}</div>
                    </div>
                    <div>
                        <label class="block text-lg font-bold text-gray-600">운영시간</label>
                        <div class="mt-1 p-3 border-2 rounded-md">{{ storeInfo.operationTime }}</div>
                    </div>
                    <router-link class="bg-white rounded-md shadow-md p-6" :to="MyStoreUpdateId($route.params.id)">
                        <button type="submit"
                            class="bg-black text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800">
                            정보 수정
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import MyStoreMenuCreate from '@/views/Store/MyStoreMenuCreate.vue';
import StoreOrders from '@/views/Store/StoreOrders.vue';
export default {
    props:['id'],
    components: {
        MyStoreMenuCreate,
        StoreOrders,
    },
    data() {
        return {
            storeInfo: {},
            clickId : 1
        };
    },
    created() {
        this.fetchStoreInfo();
    },
    methods: {
        async fetchStoreInfo() {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };
                // const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.$route.params.id}/details`, { headers });
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.id}/details`, { headers });
                this.storeInfo = response.data.result;
            } catch (error) {
                console.log(error);
            }
        },
        MyStoreUpdateId(StoreId) {
            return { path: `/${StoreId}/store-update`, params: { id: StoreId } }
        },
        toStoreOrders(storeId){
            return { path: `/${storeId}/store-orders`, params: {id: storeId}}
        }
    },

}
</script>

<style lang="scss" scoped></style>