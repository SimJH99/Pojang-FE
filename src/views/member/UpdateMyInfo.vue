<template>
    <div class="min-h-screen flex bg-gray-100">
      <!-- 왼쪽 사이드바 -->
      <div class="w-1/6 bg-white p-4">
        <ul>
          <a href="/my-info"><li class="text-lg font-bold mb-2 hover:border-gray-300  hover:border-b-2">내 정보</li></a>
        <a href="/my-orders"><li class="text-lg font-bold mb-2 hover:border-gray-300  hover:border-b-2">주문 내역</li></a>
        <a href="/my-favorite"><li class="text-lg font-bold mb-2 hover:border-gray-300  hover:border-b-2">찜 목록</li></a>
        <a href="/my-review"><li class="text-lg font-bold mb-2 hover:border-gray-300  hover:border-b-2">리뷰 목록</li></a>
        <a href="/update/myinfo/"><li class="text-lg font-bold mb-2 hover:border-gray-300  hover:border-b-2">정보 수정</li></a>
        </ul>
      </div>
  
      <!-- 오른쪽 컨텐츠 영역 -->
      <div class="w-5/6 p-8">
        <h2 class="text-3xl font-semibold mb-6 text-gray-800">프로필 수정</h2>
        <form @submit.prevent="submitProfile">
          <div class="bg-white p-4 rounded-md">
            <label class="block text-lg font-bold text-gray-600">닉네임</label>
            <input v-model="memberInfo.nickName" type="text" class="mt-1 p-3 border rounded-md w-full">
            <label class="block text-lg font-bold text-gray-600 mt-4">이메일</label>
            <input v-model="memberInfo.email" type="email" class="mt-1 p-3 border rounded-md w-full" disabled>
            <!-- 이메일은 수정 불가능하도록 disabled 속성 추가 -->
            <div>
              <label class="block text-lg font-bold text-gray-600 mt-4">휴대폰번호</label>
              <input v-model="phoneNumber" type="tel" class="mt-1 p-3 border rounded-md w-full" @input="validatePhoneNumber">
              <div v-if="phoneError" class="text-red-500 text-xs mt-1">{{ phoneError }}</div>
            </div>

            <button type="submit" class="bg-black text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        memberInfo: {},
        phoneError: '',
        beforeNickname: '',
        phoneNumber: '',
        phonetest: true,
      };
    },
    created() {
      this.fetchMember();
    },
    methods: {
      async fetchMember() {
        try {
          const token = localStorage.getItem('token');
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/members/my-info`, { headers });
          this.memberInfo = response.data.result;
          this.beforeNickname = this.memberInfo.nickName;
          this.beforepassword = this.memberInfo.password;
          this.phoneNumber = this.memberInfo.phoneNumber;
        } catch (error) {
          console.log(error);
        }
      },
      async checkDuplicateNickname() {
        const params = {
          nickname: this.memberInfo.nickName
        }
          try{
            const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/members/sign-up/nickname-validate`, params);
            this.nicknametest = true;
            this.nicknameError = response.data.message;
          } catch(error){
            this.nicknametest = false;
            this.nicknameError = '중복된 닉네임입니다.';
          }
  
      },
      validatePhoneNumber() {
        const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
        if (!phoneRegex.test(this.phoneNumber)) {
          this.phonetest = false;
          this.phoneError = '올바른 휴대폰 번호 형식이 아닙니다.';
        } else {
          this.phonetest = true;
          this.phoneError = '';
        }
      },
      async submitProfile() {
        if (!this.memberInfo.nickName) {
          alert('닉네임을 입력하세요.');
          return;
        }
        if (!this.memberInfo.phoneNumber) {
          alert('휴대폰 번호를 입력하세요.');
          return;
        }
        if(!this.phonetest) {
          alert('휴대폰 번호를 양식에 맞게 입력하세요');
          return;
        }
        try{
            const registerData = {nickname: this.memberInfo.nickName, phoneNumber: this.phoneNumber};
            const token = localStorage.getItem('token');
            const headers = {Authorization: `Bearer ${token}`} 
            await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/api/members/my-info`, registerData, {headers});
            alert("회원정보 수정 완료");
            this.$router.push({name : 'MyInfo'});
        } catch(error){
          alert(error.response.data.message);
        }
      }
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS 클래스를 직접 사용하거나 추가적인 스타일을 작성할 수 있습니다. */
  </style>
  