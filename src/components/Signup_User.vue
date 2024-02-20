<!-- src/components/SignUp.vue -->
<template>
    <div class="container bg-gray-100 min-w-full min-h-screen flex justify-center items-center">
      <form @submit.prevent="submitForm" class="max-w-lg w-full p-6 bg-white rounded-md shadow-md border-3 border-gray-800">
        <h2 class="text-2xl font-semibold mb-4">회원 가입</h2>
  
        <div class="mb-4">
          <label for="nickname" class="block text-sm font-semibold text-gray-800 mb-1">닉네임</label>
          <input v-model="nickname" type="text" id="nickname" name="nickname" class="mt-1 p-2 w-full border rounded-md">
          <button type="button" @click="checkDuplicateNickname" class="bg-gray-300 text-gray-800 p-2 rounded-md mt-2">중복 검사</button>
        </div>
  
        <div class="mb-4">
          <label for="email" class="block text-sm font-semibold text-gray-800 mb-1">이메일 주소</label>
          <input v-model="email" type="email" id="email" name="email" class="mt-1 p-2 w-full border rounded-md">
          <button type="button" @click="checkDuplicateEmail" class="bg-gray-300 text-gray-800 p-2 rounded-md mt-2">중복 검사</button>
        </div>
  
         <!-- 비밀번호 입력 -->
        <div class="mb-4">
            <label for="password" class="block text-sm font-semibold text-gray-800 mb-1">비밀번호</label>
            <input v-model="password" type="password" id="password" name="password" @input="validatePassword" class="mt-1 p-2 w-full border rounded-md">
            <div v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</div>
        </div>

        <!-- 비밀번호 확인 입력 -->
        <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-semibold text-gray-800 mb-1">비밀번호 확인</label>
            <input v-model="confirmPassword" type="password" id="confirmPassword" name="confirmPassword" class="mt-1 p-2 w-full border rounded-md">
            <div v-if="password !== confirmPassword" class="text-red-500 text-xs mt-1">비밀번호가 일치하지 않습니다.</div>
        </div>
  
        <!-- 주소 입력 -->
        <div class="mb-4">
          <label for="address" class="block text-sm font-semibold text-gray-800 mb-1">주소</label>
          <div class="mb-2">
            <label for="sido" class="sr-only">시도</label>
            <input v-model="sido" type="sido" id="sido" name="sido" placeholder="시도" class="mt-1 p-2 w-full border rounded-md">
          </div>
          <div class="mb-2">
            <label for="sigungu" class="sr-only">시군구</label>
            <input v-model="sigungu" type="text" id="sigungu" name="sigungu" placeholder="시군구" class="mt-1 p-2 w-full border rounded-md">
          </div>
          <div class="mb-2">
            <label for="query" class="sr-only">도로명</label>
            <input v-model="query" type="text" id="query" name="query" placeholder="도로명" class="mt-1 p-2 w-full border rounded-md">
          </div>
        </div>
  
        <div class="mb-4">
            <label for="phoneNumber" class="block text-sm font-semibold text-gray-800 mb-1">휴대폰 번호</label>
            <input v-model="phoneNumber" type="tel" id="phoneNumber" name="phoneNumber" placeholder="010-1234-5678" @input="validatePhoneNumber" class="mt-1 p-2 w-full border rounded-md">
            <div v-if="phoneError" class="text-red-500 text-xs mt-1">{{ phoneError }}</div>
        </div>
  
        <button type="submit" class="bg-blue-500 text-white p-2 rounded-md">가입하기</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; 
  export default {
    data() {
      return {
        nickname: '',
        email: '',
        password: '',
        passwordtest: false,
        confirmPassword: '',
        sido: '',
        sigungu: '',
        query: '',
        phoneNumber: '',
        phoneError: '',
        phonetest: false,
        emailError: '',
      };
    },
    methods: {
      async checkDuplicateEmail() {
        const params = {
          email: this.email
        }
        try{
          const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/members/sign-up/email-validate`, params);
            alert(response.data.message);
            document.getElementById('email').disabled = true;
        } catch(error){
          console.log(error);
          if(error.response.data.message === "이미 존재하는 이메일입니다."){
            console.log(error);
            alert(error.response.data.message)
          } else{
            alert(error.response.data.errors[0].reason);
          }
        }  
      },
      async checkDuplicateNickname() {
        const params = {
          nickname: this.nickname
        }
        try{
          const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/members/sign-up/nickname-validate`, params);
            alert(response.data.message);
        } catch(error){
          alert('중복된 닉네임입니다.');
        }
      },
      async submitForm() {
        if (!this.nickname) {
          alert('닉네임을 입력하세요.');
          return;
        }
  
        if (!this.email) {
          alert('이메일 주소를 입력하세요.');
          return;
        }
  
        if (!this.password) {
          alert('비밀번호를 입력하세요.');
          return;
        }
  
        if (!this.sido) {
          alert('시도를 입력하세요.');
          return;
        }
  
        if (!this.sigungu) {
          alert('시군구를 입력하세요.');
          return;
        }
  
        if (!this.query) {
          alert('도로명을 입력하세요.');
          return;
        }

        if (!this.confirmPassword) {
          alert('2차 비밀번호를 입력하세요');
          return;
        }

        if (!this.passwordtest) {
          alert('비밀번호 양식이 올바르지 않습니다.');
          return;
        }

        if (this.password !== this.confirmPassword) {
          alert('비밀번호가 일치하지 않습니다.');
          return;
        }

        if (!this.phoneNumber) {
          alert('휴대폰 번호를 입력하세요.');
          return;
        }

        if(!this.phonetest) {
          alert('휴대폰 번호를 양식에 맞게 입력하세요');
          return;
        }
  

        try{
            const registerData = {nickname: this.nickname, email: this.email, password: this.password, 
              sido: this.sido, sigungu: this.sigungu, query: this.query, phoneNumber: this.phoneNumber};
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/members/sign-up/user`, registerData);
            alert("회원가입 완료");
            this.$router.push({name : 'Login'});
        } catch(error){
          alert('회원가입 실패');
        }
        // 여기에 폼 제출 로직 추가
        console.log('폼이 제출되었습니다.');
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
      validatePassword() {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d|\W).{8,20}$/;
      if (!passwordRegex.test(this.password)) {
        this.passwordtest = false;
        this.passwordError = '비밀번호는 반드시 8-20자 이내에 숫자, 특수문자, 영문자 중 2가지 이상을 조합해야 합니다.';
      } else {
        this.passwordtest = true;
        this.passwordError = '';
      }
    },
      isValidEmail() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(!emailRegex.test(this.email)) {
        this.emailtest = false;
        this.emailError = '올바른 이메일 양식이 아닙니다.'
      } else {
        this.emailtest = true;
        this.emailError = ''
      }
    },
  }, 
}

</script>

<style scoped>
.container {
  background-color: #edf2f7; /* 컨테이너의 배경색 */
}

form {
  width: 100%; /* 폼의 너비를 100%로 설정하여 화면에 꽉 차도록 함 */
  max-width: 450px; /* 최대 너비를 지정하여 너무 커지지 않도록 함 */
  margin: 0 auto; /* 가운데 정렬을 위해 margin을 auto로 설정 */
}
</style>