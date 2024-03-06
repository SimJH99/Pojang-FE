<template>
    <div class="min-h-screen flex bg-gray-100">
        <!-- 왼쪽 사이드바 -->
        <div class="w-1/6 bg-white p-4">
            <ul>
                <li class="text-lg font-bold mb-2"><a href="/my-stores">내 매장리스트</a></li>
                <li class="text-lg font-bold mb-2"><a href="/#">메뉴 등록</a></li>
                <!-- 추가적인 카테고리 항목들을 필요에 따라 나열하세요 -->
            </ul>
        </div>

        <div class="w-5/6 p-8 flex flex-col">
            <h2 class="text-3xl font-semibold mb-6 text-gray-800">매장 정보 수정</h2>
            <form class=""  @submit.prevent="updateStore">
                <div class="bg-white p-4 rounded-md">
                  <label class="block text-lg font-bold text-gray-600">매장명</label>
                  <input v-model="name" id="name" type="text" class="mt-1 p-3 border rounded-md w-full">

                  <div class="mb-4">
                    <label for="address" class="block text-lg font-bold text-gray-600 mt-4">주소</label>
                      <input v-model="storeInfo.sido" type="sido" id="sido" name="sido" placeholder="시도" class="mt-1 p-2 w-full border rounded-md" style="display: none;">
                      <input v-model="storeInfo.sigungu" type="text" id="sigungu" name="sigungu" placeholder="시군구" class="mt-1 p-2 w-full border rounded-md" style="display: none;">
                      <input v-model="storeInfo.bname" type="text" id="bname" name="bname" placeholder="도로명" class="mt-1 p-2 w-full border rounded-md" style="display: none;">
                      <a @click="openPostcode"><input v-model="storeInfo.roadAddress" type="text" id="roadAddress" name="roadAddress" placeholder="주소" class="mt-1 p-2 w-full border rounded-md" readonly></a>
                      <input v-model="storeInfo.addressDetail" type="text" id="addressDetail" name="addressDetail" placeholder="상세주소" class="mt-1 p-2 w-full border rounded-md">
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
                    수정 완료
                  </button>
                </div>
              </form>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    props: {
            id: {
                type: String,
            }
          },
  data() {
    return {
        storeInfo: {},
        name: '',
        businessNumber: '',
        storeNumber: '',
        operationTime: '',
        introduction: '',
    };
  },
  created() {
    this.fetchStore();
  },
  methods: {
    async fetchStore() {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.$route.params.id}/details`, { headers });
        this.storeInfo = response.data.result;
        this.name = this.storeInfo.name;
        this.businessNumber = this.storeInfo.businessNumber;
        this.sido = this.storeInfo.sido;
        this.sigungu = this.storeInfo.sigungu;
        this.bname = this.storeInfo.bname;
        this.roadAddress = this.storeInfo.roadAddress;
        this.addressDetail = this.storeInfo.addressDetail;
        this.category = this.storeInfo.category;
        this.storeNumber = this.storeInfo.storeNumber;
        this.operationTime = this.storeInfo.operationTime;
        this.introduction = this.storeInfo.introduction;
      } catch (error) {
        console.log(error);
      }
    },
    getImage(id) {
        return `${process.env.VUE_APP_API_BASE_URL}/api/stores/${id}/image`;
    },
    async updateStore(){
        try{
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            const registerData = {name:this.storeInfo.name, sido:this.storeInfo.sido, sigungu:this.storeInfo.sigungu, bname:this.storeInfo.bname, roadAddress:this.storeInfo.roadAddress, 
              addressDetail:this.storeInfo.addressDetail, category:this.storeInfo.category, storeNumber:this.storeInfo.storeNumber, operationTime:this.storeInfo.operationTime,
               introduction:this.introduction};
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/stores/${this.$route.params.id}`, registerData, {headers});
            alert("수정 완료");
            this.$router.push(`/${this.$route.params.id}/my-store-info`);
        } catch(error){
            console.log(error);
          alert('수정 실패');
        }
    },
    handleFileChange(event) {
      // 선택된 파일의 정보에 접근
      const selectedFile = event.target.files[0];
      
      // 파일 정보를 사용하거나 저장할 수 있음
      console.log(selectedFile);
    },
    openPostcode() {
        new window.daum.Postcode({
            oncomplete: (data) => {
              this.storeInfo.sido = data.sido;
              this.storeInfo.sigungu = data.sigungu;
              this.storeInfo.bname = data.bname;
              this.storeInfo.roadAddress = data.roadAddress;
            },
        }).open();
      },
  },
}
</script>

<style lang="scss" scoped>

</style>