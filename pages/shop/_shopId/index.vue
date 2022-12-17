<template>
  <v-container fluid>
    <v-toolbar outlined dark dense rounded="lg">
      <v-toolbar-title>{{ $t('analytics') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row>
        <v-col>
          <v-select
            v-model="branch"
            :items="branches"
            item-text="name"
            item-value="id"
            single-line
            hide-details
            outlined
            dense
            :label="$t('select_branch')"
            @change="fetchOrders"
          ></v-select>
        </v-col>
        <v-col>
          <date-range @date-change="updateDate" />
        </v-col>
      </v-row>
    </v-toolbar>

    <!-- Cards -->
    <v-row class="mt-3">
      <v-col>
        <analytics-card :data="revenue"></analytics-card>
      </v-col>
      <v-col>
        <analytics-card :data="totalOrders"></analytics-card>
      </v-col>
      <v-col>
        <analytics-card :data="carOrders"></analytics-card>
      </v-col>
      <v-col>
        <analytics-card :data="tableOrders"></analytics-card>
      </v-col>
      <v-col>
        <analytics-card :data="subEnd"></analytics-card>
      </v-col>
    </v-row>

    <!-- Graphs -->
    <v-row>
      <v-col cols="4">
        <order-type-pie :data="orders"></order-type-pie>
      </v-col>
      <v-col cols="8">
        <total-orders-line
          :data="orders"
          :min="date[0]"
          :max="date[1]"
        ></total-orders-line>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <revenue-line
          :data="orders"
          :min="date[0]"
          :max="date[1]"
        ></revenue-line>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>{{ $t('top_products') }}</v-card-title>
          <v-card-text
            ><top-product
              :min="date[0]"
              :max="date[1]"
              :data="orders"
            ></top-product
          ></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import DateRange from '~/components/general/DateRange.vue'
import AnalyticsCard from '~/components/stats/AnalyticsCard.vue'
import OrderTypePie from '~/components/stats/graphs/OrderTypePie.vue'
import TotalOrdersLine from '~/components/stats/graphs/TotalOrdersLine.vue'
import RevenueLine from '~/components/stats/graphs/RevenueLine.vue'
import TopProduct from '~/components/stats/graphs/TopProduct.vue'
export default {
  name: 'AnalyticsPage',
  components: {
    DateRange,
    AnalyticsCard,
    OrderTypePie,
    TotalOrdersLine,
    RevenueLine,
    TopProduct,
  },
  data() {
    return {
      orders: [],
      date: [],
      branches: [],
      branch: null,
    }
  },

  // computed
  computed: {
    ...mapGetters('subscription', ['activeSubscription']),
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
        icon: 'mdi-receipt-text',
      }
    },
    carOrders() {
      return {
        name: 'cars_orders',
        value: this.orders.filter((o) => o.type === 'car').length,
        icon: 'mdi-car',
      }
    },
    tableOrders() {
      return {
        name: 'table_orders',
        value: this.orders.filter((o) => o.type === 'table').length,
        icon: 'mdi-chair-school',
      }
    },
    subEnd() {
      return {
        name: 'days_left',
        value: moment(this.$auth.user.next_billing_date).diff(moment(),'days'),
        icon: 'mdi-clock',
      }
    },
  },

  // Fetch Date From API
  async created() {
    try {
      const shop = this.$route.params.shopId
      const res = await this.$axios.get(`/api/branches/${shop}/branches`)
      this.branches = res.data
      await this.fetchOrders()
    } catch (error) {}
  },

  // Set Default Data
  mounted() {
    const now = moment()
    const monthAgo = moment().subtract(30, 'days')

    this.date = [monthAgo, now]
  },

  methods: {
    async fetchOrders() {
      try {
        const from = this.date[0] || moment().subtract(30, 'days')
        const to = this.date[1] || moment()
        const res = await this.$axios.get(`/api/orders/${this.$route.params.shopId}/orders?from=${from}&to=${to}&branch=${this.branch}`)
        // get only completed orders
        this.orders = res.data.filter((o) => o.status === 'completed')
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
    async updateDate(date) {
      this.date = date
      await this.fetchOrders()
    },
  },
}
</script>

<style></style>
