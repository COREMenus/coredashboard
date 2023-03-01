module.exports.orderBarGraphOptions = (carOrders, tableOrders, labels) => {
  return {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Car Orders',
          data: carOrders,
          stack: 'Stack 0',
          backgroundColor: '#FF6F28',
        },
        {
          label: 'Table Orders',
          data: tableOrders,
          stack: 'Stack 0',
          backgroundColor: '#00B3A6',
        },
      ],
    },
    options: {
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          min: 0,
          grid: {
            display: false,
          },
        },
      },
    }
  }
}

module.exports.revenueLineGraphOptions = (data, labels) => {
  return {
    type: 'line',
    data: {
      datasets: [
        {
          lineTension: 0.3,
          data,
          borderColor: '#FF6F28',
          backgroundColor: '#FF6F28',
          label: 'Revenue',
        },
      ],
      labels,
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          min: 0,
          grid: {
            display: false,
          },
        },
      },
    }
  }

}