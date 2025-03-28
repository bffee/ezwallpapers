// }, {
//   label: 'Daily Uploads',
//   data: [...uploads],
//   backgroundColor: ["rgba(116,238,21, 0.8)"],
//   borderColor: ["rgba(116,238,21, 1)"],
//   borderWidth: 1.5,
//   fill: true,
//   tension: 0.4,
//   pointRadius: 0
// }, {
//   label: 'New Users',
//   data: [...registerations],
//   backgroundColor: ["rgba(240,0,255, 0.8)"],
//   borderColor: ["rgba(240,0,255, 1)"],
//   borderWidth: 1.5,
//   fill: true,
//   tension: 0.4,
//   pointRadius: 0
// }]

function creatChart(chartConfig) {
  // setup 
  const data = {
    labels: [...chartConfig.labels],
    datasets: [{
      data: [...chartConfig.data],
      backgroundColor: [...chartConfig.backgroundColor],
      borderColor: [...chartConfig.borderColor],
      borderWidth: chartConfig.borderWidth,
      fill: chartConfig?.chartLineFill ? chartConfig.chartLineFill : false,
      tension: chartConfig?.chartLineSmoothness ? chartConfig.chartLineSmoothness : 1,
      pointRadius: chartConfig?.chartPointRadius ?? 1,
    }]
  };
  console.log(data)

  // config 
  const config = {
    type: chartConfig.type,
    data,
    options: {
      maintainAspectRatio: chartConfig.maintainAspectRatio,
      plugins: chartConfig.plugins,
      scales: chartConfig?.scales ? chartConfig.scales : false,
    }
  };
  return config;
}

// const ctxDevicesChart = document.getElementById("devicesChart").getContext("2d");
// const ctxRequestsChart = document.getElementById("requestsChart").getContext("2d");


const trafficChartConfig = {
  labels: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31,
  ],
  data: [
    345, 372, 398, 423, 429, 432, 460, 470, 455, 480, 
    475, 483, 497, 485, 505, 520, 510, 525, 520, 510, 
    515, 505, 515, 530, 545, 530, 540, 525, 510, 520, 
    535,
  ],
  backgroundColor: ["rgba(62, 62, 255, 0.8)"],
  borderColor: ["rgba(62, 62, 255, 1)"],
  borderWidth: 1,
  chartLineFill: true,
  chartLineSmoothness: 0.4,
  chartPointRadius: 0,
  type: 'line',
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          size: 11
        },
      boxWidth: 11,
      boxHeight: 11
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
const routeChartConfig = {
  labels: ["/", "/preview", "/profile", "/admin", "/auth"],
  data: [2454, 2435, 402, 234, 134],
  backgroundColor: ["rgba(62, 62, 255, 0.8)", "rgba(0, 128, 0, 0.8)", "rgba(255, 69, 0, 0.8)", "rgba(207, 8, 8, 0.8)", "rgba(255,231,0, 0.8)"],
  borderColor: ["rgba(62, 62, 255, 1)", "rgba(0, 128, 0, 1)", "rgba(255, 69, 0, 1)", "rgba(207, 8, 8, 1)", "rgba(255,231,0, 1)"],
  borderWidth: 1.5,
  type: 'bar',
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          size: 11
        },
        boxWidth: 11,
        boxHeight: 11
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
const deviceChartConfig = {
  labels: ["Mobile", "Desktop", "Other"],
  data: [843, 234, 94],
  backgroundColor: ["rgba(62, 62, 255, 0.8)", "rgba(0, 128, 0, 0.8)", "rgba(255, 69, 0, 0.8)", "rgba(207, 8, 8, 0.8)",],
  borderColor: ["rgba(62, 62, 255, 1)", "rgba(0, 128, 0, 1)", "rgba(255, 69, 1)", "rgba(207, 8, 8, 1)"],
  borderWidth: 1,
  type: 'doughnut',
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          size: 11
        },
      boxWidth: 11,
      boxHeight: 11
      }
    }
  },
}

// render init block
const trafficChart = new Chart(document.getElementById("trafficChart").getContext("2d"), creatChart(trafficChartConfig));
const routeChart = new Chart(document.getElementById("routeChart").getContext("2d"), creatChart(routeChartConfig));
const deviceChart = new Chart(document.getElementById("deviceChart").getContext("2d"), creatChart(deviceChartConfig));
// const deviceChart = new Chart(ctxDevicesChart, creatChart(config));
// const requestChart = new Chart(ctxRequestsChart, creatChart(config));
