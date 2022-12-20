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
    @change="dateChange"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'

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
  methods: {
    dateChange() {
        const firstDate = moment(this.date[0])
        const secondDate = moment(this.date[1])
        if (firstDate > secondDate) {
            this.$emit('date-change', this.date.reverse())
        } else {
            this.$emit('date-change', this.date)
        }
    }
  }

}
</script>

<style></style>
