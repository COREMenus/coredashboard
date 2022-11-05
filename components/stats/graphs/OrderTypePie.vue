<template>
  <v-card>
    <v-card-title>{{$t('order_locations')}}</v-card-title>
    <v-card-text>
      <canvas id="orderLocationChart"></canvas>
    </v-card-text>
  </v-card>
</template>

<script>
import { Chart, registerables } from 'chart.js'
export default {
  name: 'BarChartComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['data'],

  data() {
    return {
      chart: null,
    }
  },

  computed: {
    carOrders() {
      return this.data.filter((o) => o.type === 'car').length
    },
    tableOrders() {
      return this.data.filter((o) => o.type === 'table').length
    },
    noneOrders() {
      return this.data.filter((o) => o.type !== 'car' && o.type !== 'table')
        .length
    },
  },

  watch: {
    data() {
        this.chart.destroy()
        this.renderChart()
    }
  },

  mounted() {
    this.renderChart()
  },
  
  methods: {
    renderChart() {
      Chart.register(...registerables)
      const ctx = document.getElementById('orderLocationChart')
      // eslint-disable-next-line no-unused-vars
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Car', 'Table', 'None'],
          datasets: [
            {
              label: 'Order Loc',
              data: [this.carOrders, this.tableOrders, this.noneOrders],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(166, 165, 162)',
              ],
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
