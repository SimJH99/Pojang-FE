<template>
    <div class="min-h-screen flex bg-gray-100">
        <!-- 왼쪽 사이드바 -->
        <div class="w-1/6 bg-white p-4">
            <ul>
                <li class="text-lg font-bold mb-2"><a href="/my-info-owner">내 정보</a></li>
                <li class="text-lg font-bold mb-2"><a href="/update-my-info">내 정보 수정</a></li>
                <li class="text-lg font-bold mb-2"><a href="/store-create">매장 등록</a></li>
                <li class="text-lg font-bold mb-2"><a href="/my-stores">내 매장리스트</a></li>
            </ul>
        </div>
        <div class="w-5/6 p-8 flex flex-col">
            <h2 class="text-3xl font-semibold mb-6 text-gray-800">매장 등록</h2>
            <form class=""  @submit.prevent="createStore" enctype ="multipart/form-data">
                <div class="bg-white p-4 rounded-md">
                  <label class="block text-lg font-bold text-gray-600">매장명</label>
                  <input v-model="name" type="text" class="mt-1 p-3 border rounded-md w-full">

                  <label class="block text-lg font-bold text-gray-600 mt-4">매장 사진</label>
                  <input type="file" @change="handleImageUpload" accept="image/*" class="mt-1 p-3 border rounded-md w-full">
                  <img v-if="storeImage" :src="Image" alt="선택된 이미지" class="mt-2 max-w-[300px] max-h-[300px] rounded-md">

                  <label class="block text-lg font-bold text-gray-600 mt-4">사업자 번호</label>
                  <input v-model="businessNumber" id="businessNumber" type="text" class="mt-1 p-3 border rounded-md w-full">

                  <div class="mb-4 mt-3">
                    <label for="address" class="block text-lg font-bold text-gray-600">주소</label>
                    <div class="mb-2">
                      <label for="sido" class="sr-only">시도</label>
                      <input v-model="sido" type="text" id="sido" name="sido" placeholder="시도" class="mt-1 p-2 w-full border rounded-md">
                    </div>
                    <div class="mb-2">
                      <label for="sigungu" class="sr-only">시군구</label>
                      <input v-model="sigungu" type="text" id="sigungu" name="sigungu" placeholder="시군구" class="mt-1 p-2 w-full border rounded-md">
                    </div>
                    <div class="mb-2">
                      <label for="query" class="sr-only">도로명</label>
                      <input v-model="query" type="text" id="query" name="query" placeholder="도로명" class="mt-1 p-2 w-full border rounded-md">
                    </div>
                    <div class="mb-2">
                        <label for="addressDetail" class="sr-only">상세 주소</label>
                        <input v-model="addressDetail" type="text" id="addressDetail" name="addressDetail" placeholder="상세주소" class="mt-1 p-2 w-full border rounded-md">
                      </div>
                  </div>
                  <label class="block text-lg font-bold text-gray-600 mt-4">카테고리</label>
                  <select v-model="category" class="mt-1 p-3 border rounded-md w-full">
                      <option value="치킨">치킨</option>
                      <option value="피자">피자</option>
                      <option value="중식">중식</option>
                      <option value="한식">한식</option>
                      <option value="일식">일식</option>
                      <option value="햄버거">햄버거</option>
                      <option value="양식">양식</option>
                      <option value="분식">분식</option>
                      <!-- 필요에 따라 추가적인 옵션을 나열하세요 -->
                  </select>

                  <label class="block text-lg font-bold text-gray-600 mt-4">매장 전화 번호</label>
                  <input v-model="storeNumber" id="storeNumber" type="text" class="mt-1 p-3 border rounded-md w-full">

                  <label class="block text-lg font-bold text-gray-600 mt-4">운영 시간</label>
                  <input v-model="operationTime" id="operationTime" type="text" class="mt-1 p-3 border rounded-md w-full">

                  <label class="block text-lg font-bold text-gray-600 mt-4">가게 소개글</label>
                  <textarea v-model="introduction" id="introduction" cols="30" rows="10" class="mt-1 p-3 border rounded-md w-full"></textarea>
                  

                  <button type="submit" class="bg-black text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800">
                    매장 생성
                  </button>
                </div>
              </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            name: '',
            businessNumber: '',
            category: '',
            sido: '',
            sigungu: '',
            query: '',
            addressDetail: '',
            storeNumber: '',
            operationTime: '',
            introduction: '',
            storeImage: '',
        };
    },
    methods: {
        handleImageUpload(event) {
        this.storeImage = event.target.files[0];
            if (this.storeImage) {
                this.Image = URL.createObjectURL(this.storeImage); 
            }
        },
        async createStore() {
        try{
            const registerData = new FormData();
            registerData.append("name", this.name);
            registerData.append("category", this.category);
            registerData.append("storeNumber", this.storeNumber);
            registerData.append("operationTime", this.operationTime);
            registerData.append("businessNumber", this.businessNumber);
            if(this.storeImage) {
                registerData.append("storeImage", this.storeImage);
            }
            registerData.append("sido", this.sido);
            registerData.append("sigungu", this.sigungu);
            registerData.append("query", this.query);
            registerData.append("addressDetail", this.addressDetail);
            registerData.append("introduction", this.introduction);
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            const token = localStorage.getItem('token');
            headers.Authorization =`Bearer ${token}`;
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/stores`, registerData , {headers});
            alert("매장등록 완료");
            this.$router.push({name : 'MyStores'});
        } catch(error){
            if(!this.name) {
                alert("상호명을 입력하세요.")
            }
            else if(!this.businessNumber) {
                alert("사업자 번호를 입력하세요.")
            }
            else if(!this.category) {
                alert("카테고리를 선택하세요.")
            }
            else if(!this.storeNumber) {
                alert("전화번호를 입력하세요.")
            }
            else if(!this.operationTime) {
                alert("운영시간을 입력하세요.")
            }else {
                alert(error.response.data.message);
            }
        }
        // 여기에 폼 제출 로직 추가
        console.log('폼이 제출되었습니다.');
        },
    },
}
</script>

<style>
form {
    width: 100%; /* 폼의 너비를 100%로 설정하여 화면에 꽉 차도록 함 */
    max-width: 800px; /* 최대 너비를 지정하여 너무 커지지 않도록 함 */
  }
</style>