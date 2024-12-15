const ctx = document.querySelector('#chart1').getContext('2d');
const boxchart = document.querySelector("#chart2").getContext("2d")
const facebookDom = document.querySelector("#facebook")
const linkedInDom = document.querySelector("#linkedin")
const xDom = document.querySelector("#x")

const colorOne=['rgba(174,11,11,0.91)', "#aa0416",  "rgba(174,11,11,0.91)"]
const colorTwo = ['rgba(181,20,25,0.83)', "rgba(174,11,11,0.91)", "rgba(181,20,25,0.83)"]


showLineChart();
showSocialMediaBar();
showEconomicSupportBar();
showBoxChart()
showAvgSharesBySentiment();
showAvgInteractionsBySentimentStartWar();
createDonutRings();

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
    ("http://localhost:3000/social-media-posts",// endpoint for dataFetch fra sql
        "interactions_year", //kolonne i sql med Labels, iterer gennem array push til labels
        "year"); // rinse-repeat for Values
    createSocialMediaBar(labels, values); // skaber charten med labelsne og valuesne
    console.log(labels,values)
}

async function showEconomicSupportBar() {
    const { labels, values } = await getEndpointData
    ("http://localhost:3000/economic-support",// endpoint for dataFetch fra sql
        "sum(donation)", //kolonne i sql med Labels, iterer gennem array push til labels
        "year"); // rinse-repeat for Values
    createEconomicSupportBar(labels, values); // skaber charten med labelsne og valuesne
    console.log(labels,values)
}

async function showBoxChart () {
    const { labels, values } = await getEndpointData

    ("http://localhost:3000/negative-posts",// endpoint for dataFetch fra sql
        "count(gpt_ukraine_for_imod)", //kolonne i sql med Labels, iterer gennem array push til labels
        "gpt_ukraine_for_imod"); // rinse-repeat for Values
    BoxChart(labels, values); // skaber charten med labelsne og valuesne
    console.log(labels,values)
}
async function showAvgSharesBySentiment() {
    const { labels, values } = await getEndpointData(
        "http://localhost:3000/avg-shares-by-sentiment", // New endpoint
        "sentiment", // Column in SQL for Labels
        "avg_shares" // Column in SQL for Values
    );
    createAvgSharesChart(labels, values); // Create the chart with labels and values
    console.log(labels, values);
}
async function showAvgInteractionsBySentimentStartWar() {
    const { labels, values } = await getEndpointData(
        "http://localhost:3000/avg-interactions-by-sentiment-start-war", // New endpoint
        "sentiment", // Column in SQL for Labels
        "avg_interactions" // Column in SQL for Values
    );
    createAvgInteractionsStartWarChart(labels, values); // Create the chart with labels and values
    console.log(labels, values);
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
                borderColor: ['rgba(174,11,11,0.91)', "#aa0416",  "rgba(174,11,11,0.91)"],
                backgroundColor: ['rgba(181,20,25,0.83)', "rgba(174,11,11,0.91)", "rgba(181,20,25,0.83)"],
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
                    color: "white"
                },
                legend: {
                    position: 'line'
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: "black"
                }
            }
        }
    });
}

function createSocialMediaBar(values, labels) {
    // For some reason, we can't have this as a global variable.
    const socialMediaBar = document.querySelector("#social-media-bar").getContext('2d');
    const chart = new Chart(socialMediaBar, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Total Social Media Interactions',
                 data: values,
                borderColor: ['rgba(174,11,11,0.91)', "#aa0416",  "rgba(174,11,11,0.91)"],
                backgroundColor: ['rgba(181,20,25,0.83)', "rgba(174,11,11,0.91)", "rgba(181,20,25,0.83)"],
                tension: 0.4,
                borderWidth: 2.5,
                fill: true
            }],
            labels: labels
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

function createEconomicSupportBar(values, labels) {
    // For some reason, we can't have this as a global variable.
    const socialMediaBar = document.querySelector("#economic-support-bar").getContext('2d');
    const chart = new Chart(socialMediaBar, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Economic Support',
                data: values,
                borderColor: ['rgba(174,11,11,0.91)', "#aa0416",  "rgba(174,11,11,0.91)"],
                backgroundColor: ['rgba(181,20,25,0.83)', "rgba(174,11,11,0.91)", "rgba(181,20,25,0.83)"],
                tension: 0.4,
                borderWidth: 2.5,
                fill: true
            }],
            labels: labels
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
function BoxChart(values, labels) {
    const chart = new Chart(boxchart, {
        type: "bar",
        data: {
            labels: ["Against", "For", "Neutral"],
            datasets: [{
                data: values,
                label: "Distribution of affility",
                borderColor: ['rgba(174,11,11,0.91)', "#aa0416",  "rgba(174,11,11,0.91)"],
                backgroundColor: ['rgba(181,20,25,0.83)', "rgba(174,11,11,0.91)", "rgba(181,20,25,0.83)"],
                tension: 0.4,
                borderWidth: 2.5,
                fill: true
            }]

        },
        options: {
            scales: {
                y: {
                    ticks: {
                        color: "white",
                        callback: function (value, index, values) {
                            if (value >= 1000) {
                                return (value / 1000) + ' thsd';
                            }
                            return value;
                        }
                    }
                },
                x: {
                    ticks: {
                        color: "white"
                    }
                }
            },
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: false
                }
            }
        }
    })
}
async function createDonutRings() {
    const stackedDonut = document.getElementById('stackedDonutChart').getContext('2d');

    try {
        // Fetch data from endpoints
        const postPercentageData = await getEndpointData('http://localhost:3000/post-percentage', 'sentiment', 'post_percentage');
        const avgInteractionsData = await getEndpointData('http://localhost:3000/avg-interactions', 'sentiment', 'avg_interactions');
        const avgAngrysData = await getEndpointData('http://localhost:3000/avg-angrys', 'sentiment', 'avg_angrys');

        const labels = postPercentageData.labels;
        const postPercentages = postPercentageData.values; // Ring 1 data
        const avgInteractions = avgInteractionsData.values; // Ring 2 data
        const avgAngrys = avgAngrysData.values; // Ring 3 data

        const firstOrder = [postPercentages, avgAngrys, avgInteractions];
        const secondOrder = [avgInteractions, avgAngrys, postPercentages];

        new Chart(stackedDonut, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [
                    {
                        // Ring 1: Percentages of Posts
                        label: 'Post Percentage',
                        data: firstOrder[0], // First ring data
                        borderColor: ['rgb(95,27,161)', "rgba(181,20,25,0.83)", "rgb(93,31,154)"],
                        backgroundColor: ['rgb(95,27,161)', "rgba(174,11,11,0.91)", "rgb(95,27,161)"],
                        hoverOffset: 4,
                        radius: '25%',
                    },
                    {
                        // Ring 2: Average Engagement
                        label: 'Average Interactions',
                        data: secondOrder[0], // Second ring data
                        borderColor: ['rgb(95,27,161)', "#aa0416", "rgba(174,11,11,0.91)"],
                        backgroundColor: ['rgb(95,27,161)', "rgba(174,11,11,0.91)", "rgba(181,20,25,0.83)"],
                        hoverOffset: 4,
                        radius: ['30%', '65%'],
                    },
                    {
                        // Ring 3: Average Angry Reactions
                        label: 'Average Angry Reactions',
                        data: secondOrder[2], // Third ring data
                        borderColor: ['rgb(95,27,161)', "#aa0416", "rgba(174,11,11,0.91)"],
                        backgroundColor: ['rgb(93,31,154)', "rgba(174,11,11,0.91)", "rgba(181,20,25,0.83)"],
                        hoverOffset: 4,
                        radius: ['70%', '85%'],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 14,
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: 'Posts, Engagement, and Angry Reactions by Sentiment',
                    },
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10,
                    },
                },
            },
        });
    } catch (error) {
        console.error('Error creating donut chart:', error);
    }
}



function createAvgSharesChart(labels, values) {
    const avgSharesCtx = document.querySelector('#chart3').getContext('2d');
    new Chart(avgSharesCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Shares',
                data: values,
                borderColor: ['rgba(174,11,11,0.91)', "#aa0416", "rgba(174,11,11,0.91)"],
                backgroundColor: ['rgba(181,20,25,0.83)', "rgba(174,11,11,0.91)", "rgba(181,20,25,0.83)"],
                tension: 0.4,
                borderWidth: 2.5,
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: "white" }
                },
                y: {
                    grid: { display: false },
                    ticks: {
                        color: "white",
                        callback: function (value) {
                            if (value >= 1000) {
                                return (value / 1000) + 'k';
                            }
                            return value;
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Average Shares by Sentiment',
                    color: "white"
                },
                legend: {
                    position: 'top'
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: "black"
                }
            }
        }
    });
}
function createAvgInteractionsStartWarChart(labels, values) {
    const avgInteractionsStartWarCtx = document.querySelector('#chart4').getContext('2d');
    new Chart(avgInteractionsStartWarCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Interactions (Start of War)',
                data: values,
                borderColor: ['rgba(174,11,11,0.91)', "#aa0416", "rgba(174,11,11,0.91)"],
                backgroundColor: ['rgba(181,20,25,0.83)', "rgba(174,11,11,0.91)", "rgba(181,20,25,0.83)"],
                tension: 0.4,
                borderWidth: 2.5,
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: "white" }
                },
                y: {
                    grid: { display: false },
                    ticks: {
                        color: "white",
                        callback: function (value) {
                            if (value >= 1000) {
                                return (value / 1000) + 'k';
                            }
                            return value;
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Average Interactions by Sentiment (Start of War)',
                    color: "white"
                },
                legend: {
                    position: 'top'
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: "black"
                }
            }
        }
    });
}



// buttons til share på sociale medier.

facebookDom.addEventListener("click", function() {
    document.location.href = `https://www.facebook.com/share.php?=`
} )

linkedInDom.addEventListener("click", function() {
    document.location.href = `https://www.linkedin.com/article/new/`
} )
xDom.addEventListener("click", function() {
    document.location.href = `https://x.com/compose/post`
} )





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
