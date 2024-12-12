const dataDOM = document.querySelector("#data");
const ctx = document.querySelector('#chart').getContext('2d');

showLineChart();
createSocialMediaBar();
createEconomicSupportBar();

fetchMonthData = [];
fetchInteractions = [];

//Handlers
//handler for fetch data, loop af data, og push til array, fungerer på alle endpoints
function getLabels(data, labelKey) {
    let datalabels = []; // tomt array
    for (let i = 0; i < data.length; i++) { // itererer gennem array af data fra mysql
        datalabels.push(data[i][labelKey]); // array push alt med parametrne som er sql kolonne navn
    }
    return datalabels; // returnerer fyldte array
}

function getValues(data, valueKey) {
    let datavalues = [];
    for (let i = 0; i < data.length; i++) {
        datavalues.push(data[i][valueKey]); //
    }
    return datavalues; // Return the array
}

function getEndpointData(endpoint, labelKey, valueKey) {
    return fetch(endpoint) // tager en parameter endpoint og henter data
        .then(response => response.json())
        .then(data => {
            const labels = getLabels(data, labelKey);// tager svaret json svar som params
            const values = getValues(data, valueKey);// handlers der samler dataen til grafer
            return { labels, values }; // returner et array af labels,values
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

async function showLineChart() {
    const { labels, values } = await getEndpointData
        ("http://localhost:3000/total-interactions",// endpoint for dataFetch fra sql
         "interactions_yearmonth", //kolonne i sql med Labels, iterer gennem array push til labels
         "yearmonth"); // rinse-repeat for Values
    createChart(labels, values); // skaber charten med labelsne og valuesne
    console.log(labels,values)
}

async function showSocialMediaBar() {
    const { labels, values } = await getEndpointData
    ("http://localhost:3000/total-interactions",// endpoint for dataFetch fra sql
        "interactions_yearmonth", //kolonne i sql med Labels, iterer gennem array push til labels
        "yearmonth"); // rinse-repeat for Values
    createChart(labels, values); // skaber charten med labelsne og valuesne
    console.log(labels,values)
}

async function showEconomicSupportBar() {
    const { labels, values } = await getEndpointData
    ("http://localhost:3000/economic-support",// endpoint for dataFetch fra sql
        "interactions_yearmonth", //kolonne i sql med Labels, iterer gennem array push til labels
        "yearmonth"); // rinse-repeat for Values
    createChart(labels, values); // skaber charten med labelsne og valuesne
    console.log(labels,values)
}

/*/
displaySecondPost();

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
 /*/
function createChart(values,labels){

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Total interaktioner',
                data: values, // Use the yValue array for the chart data
                borderColor: ['#B60104'],
                backgroundColor: 'rgba(182, 1, 4, 0.3)',
                tension: 0.4,
                borderWidth: 2.5,
                fill: true
            }],
            labels: labels // Use the xValue array for the chart labels
        },
        options: {
            scales: {
                x: {
                    grid: {
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
                        callback: function (value, index, values) {
                            if (value >= 1000000) {
                                return (value / 1000000) + ' mil';
                            }
                            return value;
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Total interaktioner',
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

function createSocialMediaBar() {
    // For some reason, we can't have this as a global variable.
    const socialMediaBar = document.querySelector("#social-media-bar").getContext('2d');
    const chart = new Chart(socialMediaBar, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Social Media Interactions',
                data: [200, 60, 30],
                borderColor: ['#B60104'],
                backgroundColor: 'rgba(182, 1, 4, 0.3)',
                tension: 0.4,
                borderWidth: 2.5,
                fill: true
            }],
            labels: ["2022", "2023", "2024"]
        },
        options: {
            scales: {
                x: {
                    grid: {
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
                        callback: function (value, index, values) {
                            if (value >= 1000000) {
                                return (value / 1000000) + ' mil';
                            }
                            return value;
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Social Media Interactions',
                },
                legend: {
                    position: ''
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: "black"
                }
            }
        }
    });
}

function createEconomicSupportBar() {
    // For some reason, we can't have this as a global variable.
    const socialMediaBar = document.querySelector("#economic-support-bar").getContext('2d');
    const chart = new Chart(socialMediaBar, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Economic Support',
                data: [200, 60, 30],
                borderColor: ['#B60104'],
                backgroundColor: 'rgba(182, 1, 4, 0.3)',
                tension: 0.4,
                borderWidth: 2.5,
                fill: true
            }],
            labels: ["2022", "2023", "2024"]
        },
        options: {
            scales: {
                x: {
                    grid: {
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
                        callback: function (value, index, values) {
                            if (value >= 1000000) {
                                return (value / 1000000) + ' mil';
                            }
                            return value;
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Economic Support',
                },
                legend: {
                    position: ''
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: "black"
                }
            }
        }
    });
}

/*
let fetchMonthData = [];
let fetchInteractions = [];
let chart; // Global chart instance
let visiblePoints = 5; // Initial number of points to show
const scrollStep = 0.1; // Amount of points to add/remove per scroll
let scrollAccumulator = 0; // Accumulator for scroll events


// Fetch data from your endpoint
async function displaySecondPost() {
    fetch("http://localhost:3000/total-interactions")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                fetchMonthData.push(data[i].yearmonth);
                fetchInteractions.push(data[i].interactions_yearmonth);
            }
            createChart(); // Create chart after data is loaded
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


// Function to create the chart
function createChart() {
    const ctx = document.querySelector('#chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Total interaktioner',
                data: fetchInteractions.slice(0, visiblePoints), // Start with a few points
                borderColor: ['#B60104'],
                backgroundColor: "rgba(182, 1, 4, 0.2)",
                tension: 0.4,
                borderWidth: 4
            }],
            labels: fetchMonthData.slice(0, visiblePoints) // Start with matching labels
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: false
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




// Function to progressively reveal more points on scroll
function updateChartOnScroll(event) {
    // Accumulate the scroll delta
    scrollAccumulator += event.deltaY > 0 ? scrollStep : -scrollStep;

    // Only update visiblePoints when scrollAccumulator crosses a threshold
    if (Math.abs(scrollAccumulator) >= 1) {
        const change = Math.floor(scrollAccumulator); // Get the integer part of the accumulated scroll
        scrollAccumulator -= change; // Remove the processed amount

        // Update visiblePoints with the change and clamp within valid bounds
        visiblePoints = Math.min(
            fetchMonthData.length, // Max points available
            Math.max(5, visiblePoints + change) // At least 5 points visible
        );

        // Update the chart data with the new range
        chart.data.labels = fetchMonthData.slice(0, visiblePoints);
        chart.data.datasets[0].data = fetchInteractions.slice(0, visiblePoints);

        // Update the chart display
        chart.update();
    }
}

// Listen for scroll events
window.addEventListener('wheel', updateChartOnScroll);

// Fetch data and initialize chart
displaySecondPost();

*/
