<template>
  <v-container dark>
    <v-alert v-if="error.statusCode === 404" type="error" class="mt-4">
      {{ $t('notfound') }}
    </v-alert>
    <v-alert v-else type="error" class="mt-4">
      {{ otherError }}
    </v-alert>

    <v-btn dark :to="localePath('/')"> 
    <v-icon left>
        mdi-arrow-left-thick
    </v-icon>
    {{ $t('dashboard') }}
     </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
