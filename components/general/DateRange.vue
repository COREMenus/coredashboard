<template>
  <v-menu
    :close-on-content-click="false"
    offset-y
    min-width="auto"
    transition="scale-transition"
  >
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" icon v-on="on">
        <v-icon>mdi-calendar</v-icon>
      </v-btn>
    </template>
    <v-date-picker v-model="date" range @change="dateChange"></v-date-picker>
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
      date: [],
    }
  },
  mounted() {
    this.date[0] = moment().startOf('week').format('YYYY-MM-DD')
    this.date[1] = moment().endOf('week').format('YYYY-MM-DD')
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
    },
  },
}
</script>

<style></style>
