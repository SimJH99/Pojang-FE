<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-md shadow-md max-w-md w-full">
      <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">로그인</h2>
      <form @submit.prevent="doLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">사용자 이름</label>
          <input v-model="email" type="email" id="email" class="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500">
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-600">비밀번호</label>
          <input v-model="password" type="password" id="password" name="password" class="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500">
        </div>
        <button type="submit" class="bg-black text-white px-4 py-3 rounded-md hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 w-full">
          로그인
        </button>
        <div class="mt-4 flex items-center justify-end">
          <a href="#" class="text-sm text-gray-600 hover:underline">아이디 찾기</a>
          <a href="#" class="text-sm text-gray-600 hover:underline ml-3">비밀번호 찾기</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export default {
    data(){
        return{
            email: "",
            password: ""
        }
    },
    methods: {
        async doLogin(){
            try{
                const loginData = {email: this.email, password: this.password};
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/members/login`, loginData);
                const token = response.data.result.token;
                console.log(token);
                if(token){
                    const decoded = jwtDecode(token);
                    console.log(decoded);
                    localStorage.setItem("role", decoded.role);
                    localStorage.setItem("token", token);
                    window.location.href = "/";
                } else{
                    console.log("200 ok but not token");
                    alert("Login Failed");
                }
            } catch(error){
                const error_message = error.response.data.error_message;
                if(error_message){
                    console.log(error_message);
                    alert(error_message);
                } else{
                    console.log(error);
                    alert("Login Failed")
                } 
            }
        }
    },
}
</script>

<style scoped>
/* Tailwind CSS 클래스를 직접 사용하거나 추가적인 스타일을 작성할 수 있습니다. */
</style>
