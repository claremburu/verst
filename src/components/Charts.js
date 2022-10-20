import ApexCharts from 'apexcharts'
import React from 'react'

var options = {
    chart: {
      type: 'bar'
    },
    series: [
      {
        name: 'client stats',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }
    ],
    xaxis: {
      categories: [2021, 2022]
    }
  }

function Charts() {
  return (
    <div>Charts</div>
  )
}

export default Charts