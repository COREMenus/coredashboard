<template>
  <v-card>
    <v-card-title>{{ $t(title) }}</v-card-title>
    <v-card-text>
      <canvas id="linechart" width="100" height="50"></canvas>
    </v-card-text>
  </v-card>
</template>

<script>
import { Chart, registerables } from 'chart.js'
export default {
  name: 'LineChartComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['title', 'chartData'],
  mounted() {
    Chart.register(...registerables)

    const ctx = document.getElementById('linechart')
    // eslint-disable-next-line no-unused-vars
    const barChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [
          {
            label: '# of Orders',
            data: [10, 15, 23, 100, 4, 23, 40, 30],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
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
}
</script>

<style></style>
