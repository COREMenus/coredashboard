<template>
  <v-alert v-model="alert" class="al" transition="scale-transition" icon="mdi-bell-ring" dark color="green" dismissible>
  {{message}}
</v-alert>
</template>

<script>
export default {
  name: 'SideAlertComponent',
  props: {
      message: {
          type: String,
          default: ''
      }
  },
  data() {
    return {
      alert: true,
    }
  }
}
</script>

<style scoped>

.al {
transition: all 0.5s ease;
}


</style>
