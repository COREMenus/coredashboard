<template>
<canvas id="TopProduct"></canvas>
 
</template>

<script>
import { Chart, registerables } from 'chart.js'
import moment from 'moment'
export default {
  name: 'BarChartComponent',
  // eslint-disable-next-line vue/require-prop-types
  props: ['data', 'min', 'max', 'menu'],

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
    topProductsData() {
      let orderProducts = []
      this.data.forEach((order) => {
        orderProducts = orderProducts.concat(order.orders_products)
      })
      let products =  orderProducts.map(op => {
        return op.product
      })

      if (this.menu) {
        products = products.filter(p => p.section.MenuId === this.menu)
      }

      const data = []
      // {x: 'name', y: number}

      products.forEach(p => {
        const find = data.find(d => d.x === p.name)
        if (!find) {
            data.push({x: p.name, y: 1})
        } else {
            find.y += 1
        }
      })
      console.log(data)
      return data
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
      const ctx = document.getElementById('TopProduct')
      // eslint-disable-next-line no-unused-vars
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          datasets: [
            {data: this.topProductsData, label: 'Orders Number', backgroundColor: 'rgb(255, 99, 132)'}
          ],
        },
      })
    }
  },
}
</script>

<style></style>
