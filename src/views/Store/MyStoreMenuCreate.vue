<template>
  <div>
    <button @click="openModal" class="bg-blue-500 text-white py-2 px-4 rounded">메뉴 등록</button>

    <div v-if="isModalOpen" class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg w-96">
        <div class="flex justify-end">
          <button @click="closeModal" class="hover:bg-gray-500 hover:text-white text-gray-500 py-1 px-2 rounded ml-2">X</button>
        </div>
        <label for="menuName" class="block mb-2">메뉴명:</label>
        <input type="text" id="menuName" v-model="menuName" class="w-full mb-4 p-2 border border-gray-300 rounded-md" />

        <label for="menuInfo" class="block mb-2">메뉴 소개:</label>
        <textarea id="menuInfo" v-model="menuInfo" class="w-full mb-4 p-2 border border-gray-300 rounded-md"></textarea>

        <label for="menuPrice" class="block mb-2">가격:</label>
        <input type="text" id="menuPrice" v-model="menuPrice" class="w-full mb-4 p-2 border border-gray-300 rounded-md" />

        <label for="menuImage" class="block mb-2">메뉴 이미지</label>
        <input type="file" id="menuImage" @change="handleFileUpload" class="w-full mb-4 p-2 border border-gray-300 rounded-md" />

        <div class="flex justify-end"> <!-- Move buttons to the right -->
          <button @click="registerMenu" class="bg-green-500 text-white py-2 px-4 rounded">메뉴 등록</button>
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
      // Implement your menu registration logic here
      // You can access menuName, menuInfo, menuPrice, and menuImage in this method
      // Close the modal when done
      this.closeModal();
    },
  },
};
</script>
