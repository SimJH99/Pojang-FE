<template>
    <!-- 요기요 컬러 #ff7799 하지만 tailwind는 따로 세팅 해줘야 합니다. 최대한 비슷한 색깔로 했습니다. -->
    <div class="bg-[#ff2972]">
        <div class="w-full h-[84px] mx-auto max-w-[1400px] flex items-center justify-between px-4">
            <div class="flex items-center space-x-10">
                <div class="grid-cols-4 col-span-4">
                    <button @click="doMain" v-show="userRole !== 'ROLE_OWNER'">
                        <!-- <h1 class="text-slate-50 font-sans text-2xl py-4 ml-2"><a herf="/">포장의민족</a></h1> -->
                        <img src="@/assets/logo.png" class="h-[58px]">
                    </button>
                    <router-link to="/my-stores" v-show="userRole === 'ROLE_OWNER'">
                        <!-- <h1 class="text-slate-50 font-sans text-2xl py-4 ml-2"><a herf="/">포장의민족</a></h1> -->
                        <img src="@/assets/logo.png" class="h-[58px]">
                    </router-link>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <router-link v-bind:to="`/login`"><button v-if="!isLogin"
                        class="hover:bg-rose-400 rounded-md text-slate-50 border-2 border-slate-50 p-2 px-8">로그인</button></router-link>
                <button v-if="isLogin" @click="Rolecheck"
                    class="rounded-md hover:bg-rose-400 text-slate-50 border-2 border-slate-50 p-2 px-8">마이페이지</button>
                <button v-if="isLogin" @click="doLogout"
                    class="rounded-md hover:bg-rose-400 text-slate-50 border-2 border-slate-50 p-2 px-8">로그아웃</button>
                <a v-if="isLogin && userRole === 'ROLE_USER'" href="/cart"
                    class="rounded-md hover:bg-orange-400 text-slate-50 bg-orange-500 p-2 px-8">주문표({{ getTotalQuantity }})</a>
                <div v-if="isLogin" class="relative">
                    <span v-if="notifCount > 0"
                        class="absolute top-0 right-0 bg-red-500 rounded-full text-white text-sm w-5 h-5 flex items-center justify-center">{{ notifCount }}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useToast } from "vue-toastification";
import ToastMessage from './ToastMessage.vue';
export default {
    computed: {
        ...mapGetters(['getTotalQuantity'])
    },
    data() {
        return {
            isLogin: false,
            userRole: null,
            notifCount: 0, // 알림 카운터
            sse: null,
        }
    },

    setup() {
        const toast = useToast();
        return { toast }
    },

    created() {
        if (localStorage.getItem("token")) {
            this.isLogin = true;
            this.userRole = localStorage.getItem("role");
            if (!localStorage.getItem("sse") || this.sse == false) {
                this.connectToSSE();
            }
        }
    },
    methods: {
        doLogout() {
            localStorage.clear();
            window.location.href = "/";
        },
        doMain() {
            window.location.href = "/";
        },
        Rolecheck() {
            if (this.userRole == "ROLE_USER" || this.userRole == "ROLE_ADMIN") {
                this.$router.push({ name: 'MyInfo' });
            } else {
                this.$router.push({ name: 'MyInfoOwner' });
            }
        },
        // 알림 sse
        connectToSSE() {
            this.sse = true;
            localStorage.setItem("sse", this.sse);
            const token = localStorage.getItem('token');
            let lastEventId = localStorage.getItem('lastEventId') || '';
            const url = `${process.env.VUE_APP_API_BASE_URL}/subscribe`;
            const eventSourceInitDict = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Last-Event-ID': lastEventId,
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'X-Accel-Buffering': 'no',
                    heartbeatTimeout: 120000,
                },
            };
            // this.eventSource = new EventSourcePolyfill(url, eventSourceInitDict);
            var sseObj = new EventSourcePolyfill(url, eventSourceInitDict);
            sseObj.addEventListener('connect', (event) => {
                console.log(event.data);
                this.toast.success(localStorage.getItem('email') + "님 환영합니다.", { timeout: 3000 });
            });
            sseObj.addEventListener('sendToOwner', (event) => {
                const obj = JSON.parse(event.data);
                this.toast({
                    component: ToastMessage,
                    props: { store: obj},
                    options: { timeout: false }
                });
            });
            // this.eventSource.onmessage = (event) => {
            //     this.notify(JSON.stringify(event.data)); // 이벤트 데이터를 notify 함수로 전달
            //     // console.log(event.data);
            //     // console.log("Json 형변환 " + JSON.stringify(event.data));
            //     // alert(event.data);
            // }
            this.eventSource.onerror = (error) => {
                console.log(error);
                this.sse = false;
                this.eventSource.close();
            };
        },
        notify(eventData) {
            if (!eventData.includes("EventStream Created")) {
                this.toast({
                    component: ToastMessage,
                    props: { store: eventData},
                    options: { timeout: false }
                });
                console.log(eventData); // 문자열이 포함되어 있으면 true 출력
            } else if (eventData.includes("EventStream Created")) {
                this.toast.success(localStorage.getItem('email') + "님 환영합니다.", { timeout: 3000 });
                console.log("로그인" + eventData);
            }


        },
    }
}
</script>

<style lang="scss" scoped></style>