<template>
  <v-card color="primary" dark>
    <v-card-title> {{$t('todays_feedback')}} </v-card-title>
    <v-card-subtitle>
      <nuxt-link class="white--text" to="/analytics">View Analytics</nuxt-link>
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col>
          <div class="d-flex flex-column align-center">
            <v-icon> mdi-cash </v-icon>
            <h2>Revenue</h2>
            <h1 class="text--white">{{revenue.value}}</h1>
          </div>
        </v-col>
        <v-col>
          <div class="d-flex flex-column align-center">
            <v-icon> mdi-receipt </v-icon>
            <h2>Revenue</h2>
            <h1 class="text--white">{{totalOrders.value}}</h1>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'FeedbackComponent',
  // eslint-disable-next-line vue/require-prop-types
  data() {
    return {
        orders: []
    }
  },

  computed: {
    products() {
      let products = []
      this.orders.forEach((order) => {
        products = products.concat(order.orders_products)
      })
      return products
    },
    revenue() {
      const total = this.products
        .map((p) => {
          return p.price * p.quantity
        })
        .reduce((p, c) => p + c, 0)
      return {
        name: 'revenue',
        value: total,
        icon: 'mdi-cash',
      }
    },
    totalOrders() {
      return {
        name: 'total_orders',
        value: this.orders.length,
        icon: 'mdi-receipt-text'
      }
    },
    carOrders() {
      return {
        name: 'cars_orders',
        value: this.orders.filter((o) => o.type === 'car').length,
        icon: 'mdi-car'
      }
    },
    tableOrders() {
      return {
        name: 'table_orders',
        value: this.orders.filter((o) => o.type === 'table').length,
        icon: 'mdi-chair-school'
      }
    },
  },

  async created() {
    try {
        const from = moment().startOf('day').format('MM/DD/YYYY')
        const to = moment().endOf('day').format('MM/DD/YYYY')
        const res = await this.$axios.get('/api/orders?from=' + from + '&to=' + to)
        this.orders = res.data
    } catch (error) {
        this.$toast.error(this.$t('error_occured'))
    }
  }
}
</script>

<style></style>
