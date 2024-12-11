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
                backgroundColor: "black",
                tension: 0.4,
                borderWidth: 4

            }],
            labels: fetchMonthData // Use the xValue array for the chart labels
        },
        options: {
            scales: {
                x: {
                    grid:{
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Total interaktioner'
                },
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: "black"
                }
            }
        }
    });
}