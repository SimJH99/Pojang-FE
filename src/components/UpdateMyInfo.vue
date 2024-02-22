<template>
    <div class="min-h-screen flex bg-gray-100">
      <!-- 왼쪽 사이드바 -->
      <div class="w-1/6 bg-white p-4">
        <ul>
          <li class="text-lg font-bold mb-2"><a href="/my-info">내 정보</a></li>
          <li class="text-lg font-bold mb-2"><a href="/my-orders">주문 내역</a></li>
          <li class="text-lg font-bold mb-2"><a href="/my-favorite">찜 목록</a></li>
          <li class="text-lg font-bold mb-2"><a href="/my-review">리뷰 목록</a></li>
          <li class="text-lg font-bold mb-2"><a href="/update/myinfo/">정보 수정</a></li>
          <!-- 추가적인 카테고리 항목들을 필요에 따라 나열하세요 -->
        </ul>
      </div>
  
      <!-- 오른쪽 컨텐츠 영역 -->
      <div class="w-5/6 p-8">
        <h2 class="text-3xl font-semibold mb-6 text-gray-800">프로필 수정</h2>
        <form @submit.prevent="submitProfile">
          <div class="bg-white p-4 rounded-md">
            <label class="block text-lg font-bold text-gray-600">닉네임</label>
            <input v-model="memberInfo.nickName" type="text" class="mt-1 p-3 border rounded-md w-full" @input="checkDuplicateNickname">
            <div v-if="nicknameError" class="text-red-500 text-xs mt-1">{{ nicknameError }}</div>
            <label class="block text-lg font-bold text-gray-600 mt-4">이메일</label>
            <input v-model="memberInfo.email" type="email" class="mt-1 p-3 border rounded-md w-full" disabled>
            <!-- 이메일은 수정 불가능하도록 disabled 속성 추가 -->
            <label class="block text-lg font-bold text-gray-600 mt-4">휴대폰번호</label>
            <input v-model="memberInfo.phoneNumber" type="tel" class="mt-1 p-3 border rounded-md w-full" @input="validatePhoneNumber">
            <div v-if="phoneError" class="text-red-500 text-xs mt-1">{{ phoneError }}</div>
            <label class="block text-lg font-bold text-gray-600 mt-4">비밀번호</label>
            <input v-model="memberInfo.password" type="password" class="mt-1 p-3 border rounded-md w-full" @input="validatePassword">
            <div v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</div>
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
        emailError: '',
        nicknameError: '',
        beforeNickname: '',
        beforepassword: '',
        passwordtest: true,
        nicknametest: true,
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
        if (!phoneRegex.test(this.memberInfo.phoneNumber)) {
          this.phonetest = false;
          this.phoneError = '올바른 휴대폰 번호 형식이 아닙니다.';
        } else {
          this.phonetest = true;
          this.phoneError = '';
        }
      },
      validatePassword() {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d|\W).{8,20}$/;
        if (!passwordRegex.test(this.memberInfo.password)) {
          this.passwordtest = false;
          this.passwordError = '비밀번호는 반드시 8-20자 이내에 숫자, 특수문자, 영문자 중 2가지 이상을 조합해야 합니다.';
        } else {
          this.passwordtest = true;
          this.passwordError = '';
        }
      },
      async submitProfile() {
        if (!this.memberInfo.nickName) {
          alert('닉네임을 입력하세요.');
          return;
        }
  
        if (!this.memberInfo.email) {
          alert('이메일 주소를 입력하세요.');
          return;
        }
  
        if (!this.memberInfo.password) {
          alert('비밀번호를 입력하세요.');
          return;
        }
        if (!this.memberInfo.phoneNumber) {
          alert('휴대폰 번호를 입력하세요.');
          return;
        }
        if (!this.passwordtest) {
          alert('비밀번호 양식이 올바르지 않습니다.');
          return;
        }
        if(!this.phonetest) {
          alert('휴대폰 번호를 양식에 맞게 입력하세요');
          return;
        }
        if(!this.nicknametest) {
          alert('다른 닉네임을 입력하세요');
          return;
        }
        try{
            const registerData = {nickname: this.memberInfo.nickName, email: this.memberInfo.email, password: this.memberInfo.password, phoneNumber: this.memberInfo.phoneNumber};
            const token = localStorage.getItem('token');
            const headers = {Authorization: `Bearer ${token}`} 
            await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/api/members/my-info`, registerData, {headers});
            alert("회원정보 수정 완료");
            this.$router.push({name : 'Login'});
        } catch(error){
          alert('회원정보 수정 실패');
        }
      }
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS 클래스를 직접 사용하거나 추가적인 스타일을 작성할 수 있습니다. */
  </style>
  