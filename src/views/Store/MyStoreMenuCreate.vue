<template>
  <div>
    <button @click="openModal" class="bg-blue-500 text-white py-2 px-4 rounded">메뉴 등록</button>
    <!-- 메뉴 리스트 -->
    <div class="menu-list">
      <div v-for="(menu, index) in menus" :key="index" class="card">
        <div class="card-body flex mb-2 border-b-4 relative">
          <img v-if="menu.image" :src="menu.image" alt="Menu Image" class="card-img-top w-[100px] h-[100px] mr-4 mb-2" />
          <div>
            <h5 class="card-title">{{ menu.name }}</h5>
            <p class="card-text">{{ menu.info }}</p>
            <p class="card-text"><strong>{{ menu.price }}</strong></p>
          </div>
          <!-- 옵션 추가 버튼 -->
          <button @click="openOptionModal"
            class="bg-green-500 text-white py-2 px-4 rounded absolute top-0 right-0 mt-2">옵션 추가</button>
        </div>
      </div>
    </div>
    <!-- 메뉴 등록 모달 창 -->
    <div v-if="isModalOpen"
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg w-96">
        <div class="flex justify-end">
          <button @click="closeModal"
            class="hover:bg-gray-500 hover:text-white text-gray-500 py-1 px-2 rounded ml-2">X</button>
        </div>
        <label for="menuName" class="block mb-2">메뉴명:</label>
        <input type="text" id="menuName" v-model="menuName" class="w-full mb-4 p-2 border border-gray-300 rounded-md" />
        <label for="menuInfo" class="block mb-2">메뉴 소개:</label>
        <textarea id="menuInfo" v-model="menuInfo" class="w-full mb-4 p-2 border border-gray-300 rounded-md"></textarea>
        <label for="menuPrice" class="block mb-2">가격:</label>
        <input type="text" id="menuPrice" v-model="menuPrice" class="w-full mb-4 p-2 border border-gray-300 rounded-md" />
        <label for="menuImage" class="block mb-2">메뉴 이미지</label>
        <input type="file" id="menuImage" @change="handleFileUpload"
          class="w-full mb-4 p-2 border border-gray-300 rounded-md" />
        <div class="flex justify-end"> <!-- Move buttons to the right -->
          <button @click="registerMenu" class="bg-green-500 he text-white py-2 px-4 rounded">메뉴 등록</button>
        </div>
      </div>
    </div>
    <!-- 옵션 추가 모달 창 -->
  <div v-if="isOptionModalOpen" class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 overflow-y-auto">
  <div class="bg-white p-8 rounded-lg w-3/5 h-80 overflow-y-auto">
    <div class="flex justify-end">
      <button @click="closeOptionModal" class="hover:bg-gray-500 hover:text-white text-gray-500 py-1 px-2 rounded ml-2">X</button>
    </div>

      <!-- 옵션 카테고리 입력 -->
<div class="mb-4 flex items-center border-b border-gray-500 p-4 w-full">
  <label for="optionGroupName" class="block mr-2 text-xl whitespace-no-wrap w-56">옵션 카테고리:</label>
  <input type="text" id="optionGroupName" v-model="optionGroupName" class="w-full p-2 border border-gray-300 rounded-md" />
</div>

    <!-- 옵션 목록 -->
    <div v-for="(option, optionIndex) in selectedMenuOptions" :key="optionIndex" class="mb-4 border p-4 rounded">
      <div class="flex items-center mb-2 w-full">
        <label for="optionName" class="block mr-2 w-32">옵션명:</label>
        <input type="text" v-model="option.name" class="w-full p-2 border border-gray-300 rounded-md" />
      </div>

      <div class="flex items-center mb-2 w-full">
        <label for="optionPrice" class="block mr-2 w-32">옵션가격:</label>
        <input type="text" v-model="option.price" class="w-full p-2 border border-gray-300 rounded-md" />
      </div>
    </div>

    <!-- 옵션 추가 및 완료 버튼 -->
    <div class="flex justify-end">
      <button @click="addOption" class="bg-green-500 text-white py-2 px-4 rounded mr-2">옵션 추가</button>
      <button @click="completeOption" class="bg-blue-500 text-white py-2 px-4 rounded">완료</button>
    </div>
  </div>
</div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isModalOpen: false,
      menuName: "",
      menuInfo: "",
      menuPrice: "",
      menuImage: null,
      optionName: "",
      optionPrice: "",
      isOptionModalOpen: false,
      optionGroupName: "",
      selectedMenu: null, // 선택된 메뉴
      selectedMenuOptions: [], // 선택된 메뉴의 옵션 목록
      menus: [
        {
          name: "스파게티 볼로네제",
          info: "고기 소스가 풍부한 클래식한 이탈리안 파스타 요리.",
          price: "12,900원",
          image: "https://source.unsplash.com/random/70×70/?pasta",
        },
        {
          name: "마르게리따 피자",
          info: "토마토, 모짜렐라, 바질이 들어간 전통적인 피자.",
          price: "10,900원",
          image: "https://source.unsplash.com/random/70×70/?pizza",
        },
        {
          name: "시저 샐러드",
          info: "시저 드레싱과 크루톤이 들어간 신선한 로메인 상추 샐러드.",
          price: "8,900원",
          image: "https://source.unsplash.com/random/70×70/?salad",
        },
      ],
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleFileUpload(event) {
      this.menuImage = event.target.files[0];
    },
    registerMenu() {
      // 메뉴 등록 로직을 여기에 구현하세요
      // menuName, menuInfo, menuPrice 및 menuImage에 접근할 수 있습니다.
      // 완료되면 모달을 닫으세요
      this.closeModal();
    },
    openOptionModal(menu) {
      this.selectedMenu = menu;
      this.selectedMenuOptions = [];
      this.isOptionModalOpen = true;
    },
    closeOptionModal() {
      this.isOptionModalOpen = false;
      this.selectedMenu = null;
      this.selectedMenuOptions = [];
    },
    addOption() {
      this.selectedMenuOptions.push({ name: "", price: "" });
    },
    completeOption() {
      console.log("옵션 추가 완료!");
      this.closeOptionModal();
    },
  },
};
</script>
