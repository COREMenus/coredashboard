<template>
  <v-menu
    :close-on-content-click="false"
    offset-y
    offset-overflow
    min-width="auto"
    transition="scale-transition"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-bind="attrs"
        hide-details
        readonly
        dense
        outlined
        placeholder="Date"
        :value="`${date[0] || ''} ➔ ${date[1] || ''}`"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
    v-model="date"
    range
    @change="$emit('date-change', date)"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DateRangeComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
        date: []
    }
  },
  mounted() {
    console.log(this.modelValue)
  },

}
</script>

<style></style>
