<template>
  <v-card>
    <v-card-title>{{ $t(title) }}</v-card-title>
    <v-card-text>
      <canvas id="myChart" width="200" height="100"></canvas>
    </v-card-text>
  </v-card>
</template>

<script>
import { Chart, registerables } from 'chart.js'
export default {
  name: 'BarChartComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['title', 'chartData'],

  data() {
    return {
        chart: {}
    }
  },
  mounted() {
    Chart.register(...registerables)
    const ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.chartData.map(d => {
                return d.x
            }),
        datasets: [
          {
            label: '# of Orders',
            data: this.chartData.map(d => {
                return d.y
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  },
  methods: {
    updateChart() {
        this.chart.update()
    }
  }
}
</script>

<style></style>
