<!-- src/components/SignUp.vue -->
<template>
  <div class="container bg-gray-100 min-w-full min-h-screen flex justify-center items-center">
    <form @submit.prevent="submitForm" class="max-w-lg w-full p-6 bg-white rounded-md shadow-md border-3 border-gray-800">
      <h2 class="text-2xl font-semibold mb-4">회원 가입</h2>

      <div class="mb-4">
        <label for="nickname" class="block text-sm font-semibold texts-gray-800 mb-1">닉네임</label>
        <input v-model="nickname" type="text" id="nickname" class="mt-1 p-2 w-full border rounded-md" placeholder="닉네임을 입력하세요"/>
        <button type="button" v-show="!isNicknameUsed" @click="checkNickname" class="bg-gray-300 text-gray-800 p-2 rounded-md mt-2">중복 체크</button>
        <span v-show="isNicknameUsed" class="text-blue-800 mt-1" disabled>체크 완료</span>
      </div>
      
      <div class="mb-4">
        <label for="email" class="block text-sm font-semibold text-gray-800 mb-1">이메일 주소</label>
        <input v-model="email" type="email" @input="validEmail" id="email" class="mt-1 p-2 w-full border rounded-md" placeholder="이메일을 입력하세요">
        <div v-if="emailValidMessage" class="text-red-500 text-xs mt-1">{{ emailValidMessage }}</div>
        <button type="button" v-show="!isEmailUsed" @click="checkEmail" class="bg-gray-300 text-gray-800 p-2 rounded-md mt-2">중복 체크</button>
        <span v-show="isEmailUsed" class="text-blue-800 mt-1" disabled>사용 가능한 이메일입니다.</span>
      </div>

      <div class="mb-4" v-show="isEmailUsed">
      <label for="code">이메일 확인 코드</label>
      <span v-show="isEmailUsed & !emailCodeChecked" class="text-red-800 p-2 rounded-md mt-2" disabled>유효시간: {{ timer }}초</span>
      <input v-model="code" type="text" id="code" class="mt-1 p-2 w-full border rounded-md" placeholder="인증 코드를 입력하세요">
      <button type="button" v-show="!emailCodeChecked" @click="checkEmailCode" class="bg-gray-300 text-gray-800 p-2 rounded-md mt-2">확인</button>
      <span v-show="emailCodeChecked" class="text-blue-800 mt-1" disabled>인증 완료</span>
    </div>

       <!-- 비밀번호 입력 -->
      <div class="mb-4">
          <label for="password" class="block text-sm font-semibold text-gray-800 mb-1">비밀번호</label>
          <input v-model="password" type="password" id="password" @input="validatePassword" class="mt-1 p-2 w-full border rounded-md">
          <div v-if="passwordErrorMessage" class="text-red-500 text-xs mt-1">{{ passwordErrorMessage }}</div>
      </div>

      <!-- 비밀번호 확인 입력 -->
      <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-semibold text-gray-800 mb-1">비밀번호 확인</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" class="mt-1 p-2 w-full border rounded-md">
          <div v-if="password !== confirmPassword" class="text-red-500 text-xs mt-1">비밀번호가 일치하지 않습니다.</div>
      </div>

      <!-- 주소 입력 -->
      <div class="mb-4">
        <label for="address" class="block text-sm font-semibold text-gray-800 mb-1">주소</label>
          <input v-model="sido" type="sido" id="sido" name="sido" placeholder="시도" class="mt-1 p-2 w-full border rounded-md" style="display: none;">
          <input v-model="sigungu" type="text" id="sigungu" name="sigungu" placeholder="시군구" class="mt-1 p-2 w-full border rounded-md" style="display: none;">
          <input v-model="bname" type="text" id="bname" name="bname" placeholder="도로명" class="mt-1 p-2 w-full border rounded-md" style="display: none;">
          <a @click="openPostcode"><input v-model="roadAddress" type="text" id="roadAddress" name="roadAddress" placeholder="주소" class="mt-1 p-2 w-full border rounded-md" readonly></a>
      </div>

      <div class="mb-4">
          <label for="phoneNumber" class="block text-sm font-semibold text-gray-800 mb-1">휴대폰 번호</label>
          <input v-model="phoneNumber" type="tel" id="phoneNumber" name="phoneNumber" placeholder="010-1234-5678" @input="validatePhoneNumber" class="mt-1 p-2 w-full border rounded-md">
          <div v-if="phoneValidMessage" class="text-red-500 text-xs mt-1">{{ phoneValidMessage }}</div>
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
      code: '',
      timer: 180,
      password: '',
      passwordTest: false,
      confirmPassword: '',
      sido: '',
      sigungu: '',
      bname: '',
      roadAddress:'',
      phoneNumber: '',
      phoneValidMessage: '',
      phoneValidFlag: false,
      emailValidMessage: '',
      isNicknameUsed: false,
      isNicknameChecked: false,
      isEmailUsed: false,
      isEmailChecked: false,
      emailCodeChecked: false,
    };
  },
  methods: {
    async checkEmail() {
      try{
        if (!this.email) {
          alert("이메일을 입력해주세요.");
          return;
        }
        const params = {
          email: this.email
        }
        this.isEmailChecked = true;
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/members/sign-up/email-validate`, params);
        // this.isEmailChecked = false;

        if (response.status === 200){
          
          console.log(response);
          const result = response.data;
          if (result){
            if(confirm("입력한 이메일로 인증 번호를 발송하시겠습니까?")){
              this.isEmailUsed = true;
              this.startTimer();
              alert("입력된 이메일로 인증 번호를 발송하였습니다.");
              this.sendCode();
              document.getElementById('email').disabled = true;
            } else {
              this.isEmailUsed = false;
              document.getElementById('email').disabled = false;
            }
          } else {
            alert(response.data.message);
          }
        } else {
          throw new Error(`API 요청 실패: ${response.status}`);
        }
      } catch(error){
        console.error(error);
        alert(error.response.data.message);
      }  
    },
    async checkEmailCode() {
      try {
        if (!this.code) {
          alert("코드를 입력해주세요.");
          return;
        }
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}/api/mail/verify`, {},
          {
            params: {
              email: this.email,
              authCode: this.code,
            }
          }
        );

        if (response.status === 200) {
          const result = response.data;
          if (result.message.indexOf('완료') >= 0) {
            alert("인증코드가 확인되었습니다.");
            this.emailCodeChecked = true;
            clearInterval(this.intervalId);
            document.getElementById('code').disabled = true;
          } else {
            alert(result.message);
          }
        } else {
          throw new Error(`API 요청 실패: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        alert("인증코드가 일치하지 않습니다.");
      }
    },
    startTimer() {
      this.isTimerStarted = true;
      this.intervalId = setInterval(() => {
        this.timer--;
        if (this.timer === 0) {
          clearInterval(this.intervalId);
          this.isTimerStarted = false;
          this.isEmailUsed = false;
          alert("유효시간이 만료되었습니다. 다시 시도해주세요.");
          window.location.reload();
        }
      }, 1000);
    },
    async checkNickname() {
      try {
        if (!this.nickname) {
          alert("닉네임을 입력해주세요");
          return;
        }
        const params = {
          nickname: this.nickname
        }
        this.isNicknameChecked = true;
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/members/sign-up/nickname-validate`, params);
        // this.isNicknameChecked = false;

        if (response.status === 200){
          console.log(response);
          const result = response.data;
          if (result){
            this.isNicknameUsed = true;
            document.getElementById('nickname').disabled = true;
            alert(response.data.message);
          }
        } else {
          throw new Error(`API 요청 실패: ${response.status}`);
        }
      } catch (error){
        console.error(error);
        alert(error.response.data.message);
      }
    },
    async sendCode() {
    await axios.post(
      `${process.env.VUE_APP_API_BASE_URL}/api/mail/send`, {},
      {
        params: {
          email: this.email,
        },
      }
    );
  },
    async submitForm() {
      if (!this.nickname) {
        alert('닉네임을 입력하세요.');
        return;
      }

      if (!this.isNicknameChecked){
        alert("닉네임 중복 검사를 해주세요");
        return;
      }

      if (!this.email) {
        alert('이메일 주소를 입력하세요.');
        return;
      }

      if (!this.isEmailChecked){
        alert("이메일 중복 검사를 해주세요");
        return;
      }

      if (!this.code){
        alert("인증코드를 입력하세요");
        return;
      }

      if (!this.emailCodeChecked){
        alert("인증코드를 확인하세요");
        return;
      }

      if (!this.password) {
        alert('비밀번호를 입력하세요.');
        return;
      }

      if (!this.confirmPassword) {
        alert('2차 비밀번호를 입력하세요');
        return;
      }

      if (!this.passwordTest) {
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

      if(!this.phoneValidFlag) {
        alert('휴대폰 번호를 양식에 맞게 입력하세요');
        return;
      }
      try{
          const registerData = {nickname: this.nickname, email: this.email, password: this.password, 
            sido: this.sido, sigungu: this.sigungu, bname: this.bname, roadAddress:this.roadAddress, phoneNumber: this.phoneNumber};
          await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/members/sign-up/user`, registerData);
          alert("회원가입 완료");
          this.$router.push({name : 'Login'});
      } catch(error){
        console.log(error);
        alert(error.response.data.message);
      }
    },
      validatePhoneNumber() {
      const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
      if (!phoneRegex.test(this.phoneNumber)) {
        this.phoneValidFlag = false;
        this.phoneValidMessage = '올바른 휴대폰 번호 형식이 아닙니다.';
      } else {
        this.phoneValidFlag = true;
        this.phoneValidMessage = '';
      }
    },
    validatePassword() {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d|\W).{8,20}$/;
    if (!passwordRegex.test(this.password)) {
      this.passwordTest = false;
      this.passwordErrorMessage = '비밀번호는 반드시 8-20자 이내에 숫자, 특수문자, 영문자 중 2가지 이상을 조합해야 합니다.';
    } else {
      this.passwordTest = true;
      this.passwordErrorMessage = '';
    }
  },
    validEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(this.email)) {
      this.emailtest = false;
      this.emailValidMessage = '올바른 이메일 양식이 아닙니다.'
    } else {
      this.emailtest = true;
      this.emailValidMessage = ''
    }
  },
  openPostcode() {
      new window.daum.Postcode({
          oncomplete: (data) => {
              this.sido = data.sido;
              this.sigungu = data.sigungu;
              this.bname = data.bname;
              this.roadAddress = data.roadAddress;
          },
      }).open();
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