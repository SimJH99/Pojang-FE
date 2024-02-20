<template>
  <!-- 요기요 컬러 #ff7799 하지만 tailwind는 따로 세팅 해줘야 합니다. 최대한 비슷한 색깔로 했습니다. -->
  <div class="bg-rose-600">
  <div class="w-full h-[84px] mx-auto max-w-[1400px] flex items-center justify-between px-4">
      <div class="flex items-center space-x-10">
          <div class="grid-cols-4 col-span-4">
            <router-link to="/">
                <h1 class="text-slate-50 font-serif text-2xl py-4 ml-2"><a herf="/">포장의민족</a></h1>
            </router-link>
          </div>
      </div>
      <div class="flex items-center space-x-4">
        <a v-if="isLogin" href="/my-info" class="rounded-md text-slate-50 border-2 border-slate-50 p-2 px-8">마이페이지</a>
        <router-link v-bind:to="`/login`"><button v-if="!isLogin" class="rounded-md text-slate-50 border-2 border-slate-50 p-2 px-8" >로그인</button></router-link>
        <button v-if="isLogin" @click="doLogout" class="rounded-md text-slate-50 border-2 border-slate-50 p-2 px-8" >로그아웃</button>
        <button class="rounded-md text-slate-50 bg-orange-500 p-2 px-8">주문표(0)</button>
      </div>
  </div>
</div>



</template>

<script>
export default {
    data(){
        return {
            isLogin: false, 
            userRole: null
        }
    },
    created() {
        if(localStorage.getItem("token")){
            this.isLogin = true;
            this.userRole = localStorage.getItem("Role");
        }
    },
    methods: {
        doLogout(){
            localStorage.clear();
            window.location.reload();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>