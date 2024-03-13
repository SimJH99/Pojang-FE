// Component.vue (style omitted)
<template>
  <div class="container">
    <p>{{ store }} 가게에서 주문이 들어왔습니다.</p>
    <button class="rounded-md bg-blue-600 text-slate-50 border-2 mx-2 my-1" @click.stop="clicked"> 바로가기 </button>
  </div>
</template>

<script>
export default {
  props: {
    store: String
  },
  methods: {
    clicked() {
      return window.location.href = "/my-stores";
    },
  }
};
</script>