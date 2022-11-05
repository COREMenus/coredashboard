<template>
  <v-card>
    <v-card-title>{{$t('revenue')}}</v-card-title>
    <v-card-text>
      <canvas id="revenueLine"></canvas>
    </v-card-text>
  </v-card>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import moment from 'moment'
export default {
  name: 'BarChartComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['data', 'min', 'max'],

  data() {
    return {
      chart: null,
    }
  },

  computed: {
    dates() {
      const startDate = this.minDate
      const endDate = this.maxDate
      const datesBetween = []

      let startingMoment = startDate

      while (startingMoment <= endDate) {
        datesBetween.push(startingMoment.clone()) // clone to add new object
        startingMoment = startingMoment.add(1, 'days')
      }
      return datesBetween
    },
    minDate() {
      return moment(this.min).startOf('day')
    },
    maxDate() {
      return moment(this.max).endOf('day')
    },
    revenue() {
      const orders = []

      this.dates.forEach((date) => {
        const sameDates = this.data.filter((o) =>
          date.isSame(o.createdAt, 'day')
        )
        if (sameDates) {
            const revenue = this.calculateRevenue(sameDates)
          orders.push(revenue)
        } else {
          orders.push(0)
        }
      })

      return orders
    },
  },

  watch: {
    data() {
      this.chart.destroy()
      this.renderChart()
    },
  },

  mounted() {
    this.renderChart()
  },

  methods: {
    renderChart() {
      Chart.register(...registerables)
      const ctx = document.getElementById('revenueLine')
      // eslint-disable-next-line no-unused-vars
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.dates.map((d) => {
            return d.format('D/M')
          }),
          datasets: [
            {
              lineTension: 0.3,
              label: 'Revenue',
              data: this.revenue,
              backgroundColor: 'rgb(255, 99, 132)',
            },
          ],
        },
      })
    },
    calculateRevenue(orders) {
      let products = []
      orders.forEach((order) => {
        products = products.concat(order.orders_products)
      })

      const total = products
        .map((p) => {
          return p.price * p.quantity
        })
        .reduce((p, c) => p + c, 0)
      return total
    },
  },
}
</script>

<style></style>
