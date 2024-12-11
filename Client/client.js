const ctx = document.querySelector('#chart').getContext('2d');

displaySecondPost();

fetchMonthData = [];
fetchInteractions = [];

function displaySecondPost() {
        fetch("http://localhost:3000/total-interactions")
            .then(response => response.json())
            .then(data => {
                    for (let i = 0; i < data.length; i++) {
                            fetchMonthData.push(data[i].yearmonth);
                            fetchInteractions.push(data[i].interactions_yearmonth);
                    }
                    createChart();
            })
            .catch(error => {
                    console.error('Error fetching data:', error);
            });
}

function createChart() {
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Total interaktioner',
                data: fetchInteractions, // Use the yValue array for the chart data
                borderColor: ['#B60104'],
                backgroundColor: 'rgba(182, 1, 4, 0.3)',
                tension: 0.4,
                borderWidth: 2.5,
                fill: true
            }],
            labels: fetchMonthData // Use the xValue array for the chart labels
        },
        options: {
            scales: {
                x: {
                    grid:{
                        display: false
                    },
                    ticks: {
                        color: "white"
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: "white",
                        callback: function(value, index, values) {
                            if (value >= 1000000) {
                                return (value / 1000000) + ' mil';
                            }
                            return value; }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Total interaktioner',
                    color: "white"
                },
                legend: {
                    position: '',
                    labels: {
                        color:"white"
                    }
                    },
                tooltip: {
                    enabled: true,
                    backgroundColor: "black"
                }
            }
        }
    });
}