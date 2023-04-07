<template>
  <v-container fluid>
    <h2>Main Dashboard</h2>
    <v-row>
      <v-col md="6" sm="12">
        <v-select
          v-model="branch"
          :items="branches"
          item-text="name"
          item-value="id"
          single-line
          hide-details
          solo
          flat
          dense
          :label="$t('select_branch')"
          @change="fetchAnalytics()"
        ></v-select>
      </v-col>
      <v-col>
        <date-range @date-change="updateDate" />
      </v-col>
    </v-row>

    <!-- Subscription -->
    <v-row>
      <v-col cols="12" lg="6">
        <v-card flat>
          <v-card-title>{{subEnd}}</v-card-title>
          <v-card-subtitle>Days left For Subscription</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Graphs -->
    <v-row class="mt-3">
      <v-col cols="12" lg="6">
        <ChartCard :title="$t('overall_revenue')" :count="revenueAnalytics.count">
          <canvas id="revenueLine"></canvas>
        </ChartCard>
      </v-col>
      <v-col cols="12" lg="6">
        <ChartCard :title="$t('overall_orders')" :count="ordersAnalytics.count">
          <canvas id="ordersBar"></canvas>
        </ChartCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { Chart, registerables } from 'chart.js'
import DateRange from '~/components/general/DateRange.vue'
import ChartCard from '~/components/stats/ChartCard.vue'
import { revenueLineGraphOptions, orderBarGraphOptions } from '~/assets/config/graphsOptions'
export default {
  name: 'AnalyticsPage',
  components: {
    DateRange,
    ChartCard,
  },
  data() {
    return {
      orders: [],
      date: [],
      branches: [],
      branch: null,
      revenueChart: null,
      ordersChart: null,
      revenueAnalytics: { count: 0 },
      ordersAnalytics: { count: 0 }
    }
  },

  // computed
  computed: {
    ...mapGetters('subscription', ['activeSubscription']),
    subEnd() {
      const daysLeft = moment(this.$auth.user.next_billing_date).diff(
        moment(),
        'days'
      )
      return daysLeft < 0 ? 0 : daysLeft
    },
  },

  watch: {
    revenueAnalytics() {
      if (this.revenueChart !== null) this.revenueChart.destroy()
      const chartData = this.revenueAnalytics.chart
      this.revenueChart = this.renderChart(
        'revenueLine',
        revenueLineGraphOptions(chartData.data, chartData.labels)
      )
    },
    ordersAnalytics() {
      if (this.ordersChart !== null) this.ordersChart.destroy()
      const chartData = this.ordersAnalytics.chart
      this.ordersChart = this.renderChart(
        'ordersBar', 
        orderBarGraphOptions(chartData.carOrdersData, chartData.tableOrdersData, chartData.labels))
    },
  },

  // Set Default Data
  async mounted() {
    try {
      this.date[0] = moment().startOf('week').format('YYYY-MM-DD')
      this.date[1] = moment().endOf('week').format('YYYY-MM-DD')
      const shop = this.$route.params.shopId
      const res = await this.$axios.get(`/api/branches/${shop}/branches`)
      this.branches = res.data
      await this.fetchAnalytics()
    } catch (error) {}
  },

  methods: {
    async fetchRevenueAnalytics() {
      try {
        const from = this.date[0] || moment().startOf('week')
        const to = this.date[1] || moment().endOf('week')
        const res = await this.$axios.get(
          `/api/charts/${this.$route.params.shopId}/revenue?from=${from}&to=${to}&branch=${this.branch}`
        )
        this.revenueAnalytics = res.data
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
    async fetchOrdersAnalytics() {
      try {
        const from = this.date[0] || moment().startOf('week')
        const to = this.date[1] || moment().endOf('week')
        const res = await this.$axios.get(
          `/api/charts/${this.$route.params.shopId}/orders?from=${from}&to=${to}&branch=${this.branch}`
        )
        this.ordersAnalytics = res.data
      } catch (error) {
        this.$toast.error(this.$t('error_occured'))
      }
    },
    async fetchAnalytics() {
      await this.fetchRevenueAnalytics()
      await this.fetchOrdersAnalytics()
    },
    async updateDate(date) {
      this.date = date
      await this.fetchAnalytics()
    },
    renderChart(id, options) {
      Chart.register(...registerables)
      const ctx = document.getElementById(id)
      return new Chart(ctx, options)
    },
  },
}
</script>

<style></style>
