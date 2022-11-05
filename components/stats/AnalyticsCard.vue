<template>
  <v-hover v-slot="{ hover }">
    <v-alert height="100" dark :icon="data.icon" color="primary" :outlined="!hover" :elevation="hover ? 12:0">
      <h2>{{ data.value }}</h2>
      {{ $t(data.name) }}
    </v-alert>
  </v-hover>
</template>

<script>
export default {
  name: 'AnalyticsCardComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['data'],
}
</script>

<style></style>
