<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-md shadow-md max-w-md w-full">
          <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">이메일 찾기</h2>
          <form @submit.prevent="findEmail" class="w-full">
            <div class="mb-4">
                <label for="phoneNumber" class="block text-sm font-semibold text-gray-800 mb-1">휴대폰 번호</label>
                <input v-model="phoneNumber" type="tel" id="phoneNumber" name="phoneNumber" placeholder="010-1234-5678" @input="validatePhoneNumber" class="mt-1 p-2 w-full border rounded-md">
                <div v-if="phoneValidMessage" class="text-red-500 text-xs mt-1">{{ phoneValidMessage }}</div>
            </div>
            <button type="submit" class="bg-black text-white px-4 py-3 rounded-md hover:bg-gray-900 focus:outline-none focus:shadow-outline-gray active:bg-gray-800 w-full">
              이메일 찾기
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            phoneNumber: '',
            phoneValidMessage: '',
            phoneValidFlag: false,
        }
    },
    methods: {
        async findEmail(){
            try{
                if (!this.phoneNumber) {
                    alert('휴대폰 번호를 입력하세요.');
                    return;
                }

                if(!this.phoneValidFlag) {
                    alert('휴대폰 번호를 양식에 맞게 입력하세요');
                    return;
                }
                const phoneNumberData = {phoneNumber: this.phoneNumber};
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/members/find-email`, phoneNumberData);
                console.log(response);
                alert("이메일 : " + response.data.result.email);
            }
            catch(error){
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
    }
}
</script>

<style lang="scss" scoped>

</style>