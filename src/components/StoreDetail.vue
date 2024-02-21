<template>
  <div class="store-info p-4 bg-gray-100 rounded-lg shadow-md">
    <div class="store-header flex items-center">
      <img :src="getImage(store.id)" alt="매장 이미지" class="store-img w-48 h-48 object-cover rounded-lg">
      <div class="store-info-text ml-4">
        <h2 class="store-name text-2xl font-bold">{{ store.name }}</h2>
        <div class="rating text-sm text-gray-500 mt-2 flex items-center" style="font-size: 1.5em; background: none; border: none;">
          <span class="font-bold text-yellow-500">★</span> 
          <span class="font-bold text-yellow-500">{{ store.avgRating }}</span>
        </div> 
        <div class="likes text-sm text-gray-500 mt-1 flex items-center" style="font-size: 1.5em; background: none; border: none;">
          <button @click="toggleLike" :class="isLike ? 'font-bold text-red-500' : 'font-bold text-gray-500'"
        >♥</button>
          <span class="font-bold text-red-500">{{ store.likes }}</span>
        </div>
      </div>
    </div>
    
    <div class="tabs mt-8">
      <button
        v-for="(item, index) in tabs"
        :key="index"
        @click="tab = item"
        :class="{ 'bg-white text-gray-900 border-gray-300': tab === item }"
        class="px-4 py-2 mr-2 hover:bg-gray-100 border border-transparent"
      >
        {{ item }}
      </button>
    </div>

    <div v-if="tab === '메뉴'" class="bg-white p-4 shadow-md">
      <ul class="mt-4">
        <MenuListComponent/>
      </ul>
    </div>

    <div v-if="tab === '리뷰'" class="bg-white p-4 shadow-md">
        <ReviewListComponent/>
    </div>

    <div v-if="tab === '정보'" class="bg-white p-4 shadow-md">
      <div class="info-list">
        <h3 class="info-title text-lg font-bold">업체 정보</h3>
        <div class="info-item mt-2">영업시간: {{ store.operationTime }}</div>
        <div class="info-item">전화번호: {{ store.storeNumber }}</div>
        <div class="info-item">주소: {{ store.address }}</div>
        <!-- <div id="map" style="width:100%;height:380px;"/>        -->  
        <h3 class="info-title text-lg font-bold mt-4">사업자 정보</h3>
        <div class="info-item mt-2">상호명: {{ store.name }}</div>
        <div class="info-item">사업자등록번호: {{ store.businessNumber }}</div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import ReviewListComponent from '@/components/ReviewList.vue';
import MenuListComponent from '@/components/MenuList.vue';
export default {
  components:{ 
        ReviewListComponent,
        MenuListComponent
    },
  data() {
    return {
      store: {},
      tabs: ['메뉴', '리뷰', '정보'],
      tab: '메뉴',
      isLike: null,
    };
  },
  created() {
    this.fetchStore();
    this.fetchLike();
  },
  methods: {
        async fetchStore() {
            try {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/1/details`);
            this.store = response.data.result;
            }catch(error) {
                console.log(error);
            }       
        },
        async fetchLike() {
          try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/1/favorite`, { headers });
            this.isLike = response.data;
            }catch(error) {
                console.log(error);
            } 
        },
        getImage(id) {
            return `${process.env.VUE_APP_API_BASE_URL}/api/stores/${id}/image`;
        },
        async setLike() {
          const token = localStorage.getItem('token');
          const headers = {Authorization: `Bearer ${token}`} 
          await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.store.id}/favorites`, {},{headers});
          this.isLike = true;
          alert(`${this.store.name}을 찜했습니다.`);
          this.store.likes += 1;
        },
        async cancelLike() {
          const token = localStorage.getItem('token');
          const headers = {Authorization: `Bearer ${token}`} 
          await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.store.id}/favorites`, {headers});
          alert(`${this.store.name}을 찜 취소했습니다.`);
          this.isLike = false;
          this.store.likes -= 1;
        },
        toggleLike() {
          if (this.isLike) {
            this.cancelLike();
          } else {
            this.setLike();
          }
        },

    },
  // mounted() {
  //   if (window.kakao && window.kakao.maps) {
  //     this.initMap();
  //   } else {
  //     const script = document.createElement("script");
  //     script.onload = () => window.kakao.maps.load(this.initMap);
  //     script.src =
  //       "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f2c04c89e330dd800bd7b92578cb1bd5";
  //     document.head.appendChild(script);
  //   }
  // },
  // methods: {
  //   initMap() {
  //     const container = document.getElementById("map");
  //     const options = {
  //       center: new window.kakao.maps.LatLng(33.450701, 126.570667),
  //       level: 5,
  //     };

  //     //지도 객체를 등록합니다.
  //     //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  //     this.map = new window.kakao.maps.Map(container, options);
  //   },
  // }
};
</script>

<style>
/* 필요한 스타일을 추가하세요 */
.store-info {
  /* 매장 정보 스타일 */
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.store-header {
  /* 매장 헤더 스타일 */
  display: flex;
  align-items: center;
}

.store-info-text {
  /* 매장 정보 텍스트 스타일 */
  margin-left: 1rem;
}

.rating,
.likes {
  /* 별점 및 찜 수 스타일 */
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #333;
}

.menu-list {
  /* 메뉴 리스트 스타일 */
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.25rem;
  background-color: #f8f8f8;
}

.menu-item {
  /* 메뉴 아이템 스타일 */
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
}

.menu-img {
  /* 메뉴 이미지 스타일 */
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 0.25rem;
}

.menu-name {
  /* 메뉴 이름 스타일 */
  font-size: 1rem;
  font-weight: bold;
}

.menu-info {
  /* 메뉴 정보 스타일 */
  margin-left: 1rem;
}

.menu-price {
  /* 메뉴 가격 스타일 */
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #333;
}

.review-item {
  /* 리뷰 아이템 스타일 */
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  background-color: #f8f8f8;
}

.info-list {
  /* 정보 리스트 스타일 */
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.25rem;
  background-color: #f8f8f8;
}

.info-item {
  /* 정보 아이템 스타일 */
  padding: 0.5rem 0;
  font-size: 0.875rem;
  color: #333;
}

/* 기타 스타일을 추가하세요 */
</style>
