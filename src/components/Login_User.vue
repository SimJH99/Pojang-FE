<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-md shadow-md max-w-md w-full">
      <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">로그인</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-600">사용자 이름</label>
          <input v-model="username" type="text" id="username" name="username" class="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-indigo-500">
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
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // 로그인 로직을 여기에 추가
      console.log('로그인 시도:', this.username, this.password);
    }
  }
};
</script>

<style scoped>
/* Tailwind CSS 클래스를 직접 사용하거나 추가적인 스타일을 작성할 수 있습니다. */
</style>
