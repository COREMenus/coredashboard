<template>
  <v-container>
    <v-card flat rounded="xl" min-height="700">
      <v-card-title>
        Top Items Sales
        <v-spacer> </v-spacer>
        <v-btn-toggle v-model="time" dense dark color="primary" @change="fetchOrders">
            <v-btn> Today </v-btn>
            <v-btn> Week </v-btn>
            <v-btn> Month </v-btn>
            <v-btn> Year </v-btn>
        </v-btn-toggle>
      </v-card-title>
      <v-card-text>
        <top-product :menu="$route.params.id" :data="orders" :min="minDate" :max="maxDate"></top-product>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import moment from 'moment'
import TopProduct from "~/components/stats/graphs/TopProduct.vue"

export default {
  name: 'MenuManagerIndex',
  components: { TopProduct },
  data() {
    return {
        time: 1,
        orders: [],
    }
  },
  computed: {
    minDate() {
        if (this.time === 0) {
            return moment().subtract(1, 'days').startOf('day')
        }
        // week
        else if (this.time === 1) {
            return moment().subtract(7, 'days').startOf('day')
        } 
        // month
        else if (this.time === 2) {
            return moment().subtract(1, 'month').startOf('day')
        }
        // year
        else {
            return moment().subtract(1, 'year').startOf('day')
        }
    },
    maxDate() {
        return moment().endOf('day')
    }
  },
  async created() {

    await this.fetchOrders()
  },
  methods: {
    async fetchOrders() {
      try {
        const from = this.minDate;
        const to = this.maxDate;

        const res = await this.$axios.get(`/api/orders/${this.$route.params.shopId}/orders?from=${from}&to=${to}`)
        // get only completed orders
        this.orders = res.data.filter((o) => o.status === 'completed')
      } catch (error) {
        
        this.$toast.error(this.$t('error_occured'))
      }
    },
  }
}
</script>

<style></style>
