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

  const usersChartConfig = {
    labels: [
        "Mon", "Tue", "Wed", "Thus", "Fri", "Sat", "Sun",
      ],
      data: [
        328, 372, 398, 429, 470, 455, 480, 
      ],
    backgroundColor: ["rgba(62, 62, 255, 0.8)"],
    borderColor: ["rgba(62, 62, 255, 1)"],
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
  const rolesChartConfig = {
    labels: ["Users", "Moderators", "Admin"],
    data: [243, 48, 12],
    backgroundColor: ["rgba(62, 62, 255, 0.8)", "rgba(0, 128, 0, 0.8)", "rgba(207, 8, 8, 0.8)",],
    borderColor: ["rgba(62, 62, 255, 1)", "rgba(0, 128, 0, 1)", "rgba(207, 8, 8, 1)",],
    borderWidth: 1,
    type: 'pie',
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
  const usersChart = new Chart(document.getElementById("usersChart").getContext("2d"), creatChart(usersChartConfig));
  const rolesChart = new Chart(document.getElementById("rolesChart").getContext("2d"), creatChart(rolesChartConfig));