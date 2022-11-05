<template>
  <v-card>
    <v-card-title>{{$t('total_orders')}}</v-card-title>
    <v-card-text>
      <canvas id="totalOrders"></canvas>
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
      const startDate = moment(this.minDate)
      const endDate = moment(this.maxDate)
      const datesBetween = []

      let startingMoment = startDate

      while (startingMoment <= endDate) {
        datesBetween.push(startingMoment.clone()) // clone to add new object
        startingMoment = startingMoment.add(1, 'days')
      }
      return datesBetween
    },
    minDate() {
      return moment(this.min)
    },
    maxDate() {
      return moment(this.max)
    },
    totalOrders() {
        const orders = []

        this.dates.forEach(date => {
            const sameDates = this.data.filter(o => date.isSame(o.createdAt, 'day'))
            if (sameDates) {
                orders.push(sameDates.length)
            } else {
                orders.push(0) 
            }
        })
        
        return orders
    }
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
      const ctx = document.getElementById('totalOrders')
      // eslint-disable-next-line no-unused-vars
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.dates.map(d => {
            return d.format('D/M')
          }),
          datasets: [
            {
                lineTension: 0.3,
              label: 'Total Orders',
              data: this.totalOrders,
              borderColor: 'rgb(255, 99, 132)'
            },
          ],
        },
        
      })
    },
    updateChart() {
      this.chart.update()
    },
  },
}
</script>

<style></style>
