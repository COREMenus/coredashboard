<template>
  <v-sheet rounded="xl" class="pa-4">
    <h5 class="font-weight-medium"> {{title}} </h5>
    <h2>{{count}}</h2>
    <slot></slot>
  </v-sheet>
</template>

<script>
export default {
  props: ['title', 'count']
}
</script>