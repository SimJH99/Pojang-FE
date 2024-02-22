<template>
    <div class="info-list">
        <h3 class="info-title text-lg font-bold">업체 정보</h3>
        <div class="info-item mt-2">영업시간: {{ store.businessHours }}</div>
        <div class="info-item">전화번호: {{ store.phone }}</div>
        <div class="info-item">주소: {{ store.address }}</div>
        <!-- <div id="map" style="width:100%;height:380px;"/>        -->
        <h3 class="info-title text-lg font-bold mt-4">결제 정보</h3>
        <div class="info-item">결제수단: {{ store.paymentMethod }}</div>
        <h3 class="info-title text-lg font-bold mt-4">사업자 정보</h3>
        <div class="info-item mt-2">상호명: {{ store.businessName }}</div>
        <div class="info-item">사업자등록번호: {{ store.businessNumber }}</div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            store : {},
            businessHours: "",
            phone: "05079727736 (요기요 제공 번호)",
            address: "제주특별자치도 제주시 노형동 904-4 1층",
            paymentMethod: "요기서결제",
            businessName: "(주)비케이알",
            businessNumber: "101-86-76277",
            image: "C:/Users/Playdata/Desktop/pojang_image/apple.jpg",
            name: "홍콩반점",
            rating: 4.5,
            likes: 100,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>