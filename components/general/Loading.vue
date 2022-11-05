<template>
  <div v-if="loading" class="loading-page">
    <img class="loading" src="/logo.png" alt="">
    Loading
  </div>
</template>
<script>
export default {
  name: 'LoadingComponent',

  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>
<style scoped>
.loading-page {
    position: fixed;
    width: 100%;
    height: 100%;
    background: white;
    text-align: center;
    z-index: 9999;
}
.loading {
  width: 200px;
  height: 200px;
  right: 0;
  left: 0;
  margin: 0 auto;
  margin-top: 10%;
  display: block;
  animation: spin 2s ease-in-out infinite;
}
@keyframes spin {
    0% {
        transform: scale(1.0);
    }
    50% {
        transform: scale(0.8);
    }
    100% {
        transform: scale(1.0);
    }
}
</style>
