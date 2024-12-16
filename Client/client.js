const ctx = document.querySelector('#chart1').getContext('2d');
const boxchart = document.querySelector("#chart2").getContext("2d")
const facebookDom = document.querySelector("#facebook")
const linkedInDom = document.querySelector("#linkedin")
const xDom = document.querySelector("#x")

const button =document.getElementById('toggle-chart')

button.addEventListener('click', function () {
    const imodChart = document.getElementById('pie-chart-imod');
    const forChart = document.getElementById('pie-chart-for');

    if (imodChart.style.display === 'none') {
        imodChart.style.display = 'block';
        forChart.style.display = 'none';
        button.style.color = "white"
        button.style.background = backgroundColorOne
        button.textContent = "Click for Percentage of posts"

    } else {
        imodChart.style.display = 'none';
        forChart.style.display = 'block';
        button.style.background = colorFor
        button.style.color = "White"
        button.textContent = "Click to see engagement"

    }
});








const borderColorOne= ['#B60104']
const backgroundColorOne ='rgba(182, 1, 4, 0.4)'

const backgroundColorThree= 'rgba(182, 1, 4, 0.3)'

const colorFor = "rgba(31,31,31,0.76)"
const colorForTwo = "rgba(50,50,50,0.78)"

const borderColorTwo = 'rgba(140, 140, 140, 0.2)'
const backgroundColorTwo =  'rgba(82, 82, 82, 0.95)'
showLineChart();
showSocialMediaBar();
showEconomicSupportBar();
showBoxChart()
showPieChartFor()
showPieChartImod()
showBarChartImod()
showBarChartFor()
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
async function showPieChartFor() {
    const { labels, values } = await getEndpointData(
        "http://localhost:3000/sentiment-percentage", // Endpoint for sentiment percentage
        "sentiment", // "For" and "Imod"
        "post_percentage", // Percentage of posts
    );
    createPieChartFor(labels, values); // Render the pie chart
}
async function showPieChartImod() {
    const { labels, values } = await getEndpointData(
        "http://localhost:3000/percentage-posts", // Endpoint for interaction percentage
        "sentiment", // "For" and "Imod"
        "engagement_percentage" // Percentage of interactions
    );
    createPieChartImod(labels, values); // Render the pie chart
}
async function showBarChartFor() {
    const { labels, values } = await getEndpointData(
        "http://localhost:3000/avg-shares-for", // Endpoint for "For" sentiment shares
        "year", // Year labels
        "avg_shares" // Average shares
    );
    createBarChartFor(labels, values); // Render the bar chart
}
async function showBarChartImod() {
    const { labels, values } = await getEndpointData(
        "http://localhost:3000/avg-shares-imod", // Endpoint for "Imod" sentiment shares
        "year", // Year labels
        "avg_shares" // Average shares
    );
    createBarChartImod(labels, values); // Render the bar chart
}
async function showBoxChart () {
    const { labels, values } = await getEndpointData

    ("http://localhost:3000/negative-posts",// endpoint for dataFetch fra sql
        "count(gpt_ukraine_for_imod)", //kolonne i sql med Labels, iterer gennem array push til labels
        "gpt_ukraine_for_imod"); // rinse-repeat for Values
    BoxChart(labels, values); // skaber charten med labelsne og valuesne
    console.log(labels,values)
}
function createChart(values,labels){

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Total Interactions ',
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
                        max:18,
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
                    text: 'Total Interactions ',
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
                borderColor: ['#B60104'],
                backgroundColor: 'rgba(182, 1, 4, 0.3)',
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
                borderColor: ['#B60104'],
                backgroundColor: 'rgba(182, 1, 4, 0.3)',
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
                borderColor: [borderColorOne, colorForTwo, colorForTwo],
                backgroundColor: [backgroundColorOne, colorFor, colorFor],
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
// buttons til share på sociale medier.
function createPieChartFor(labels, values) {
    const ctxFor = document.querySelector("#pie-chart-for").getContext("2d");
    new Chart(ctxFor, {
        type: 'pie',
        data: {
            labels: ["Against","For"],
            datasets: [{
                label: 'hi',
                data: values,
                backgroundColor: [colorFor,backgroundColorThree],
                borderColor: [colorForTwo,borderColorOne],
                borderWidth: 1,
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,

                    text: 'Percentages of posts for or against Ukraine',
                    color: "white"
                }

            }
        }
    });
}
function createPieChartImod(labels, values) {
    const ctxImod = document.querySelector("#pie-chart-imod").getContext("2d");
    new Chart(ctxImod, {
        type: 'pie',
        data: {
            labels: ["For","Against"],
            datasets: [{
                label: 'Percentages of amount of posts',
                data: values,
                backgroundColor: [colorFor,backgroundColorOne],
                borderColor: [colorForTwo,borderColorOne],
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Average engagement for each type of post",
                    color: "white"
                },
                tooltip: {
                    backgroundColor: "black",

                }

            }
        }
    });
}
function createBarChartFor(labels, values) {
    const ctxBarFor = document.querySelector("#avg-bar-chart").getContext("2d");
    new Chart(ctxBarFor, {
        type: 'bar',
        data: {
            labels: labels,  // Year labels
            datasets: [{
                label: 'Avg Shares for "For" Sentiment',
                data: values,  // Average shares
                borderColor: [colorForTwo],
                backgroundColor: colorFor,
                borderWidth: 1,
                borderRadius: 6,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Average Shares on posts that are Supporting',
                    color: "white"
                },
                tooltip: {
                    backgroundColor: "black",
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 200,
                    ticks: {
                        color: "white"
                    }},
                x: {
                    ticks: {
                        color: "white"
                    }
                }
            }
        }
    });
}
function createBarChartImod(labels, values) {
    const ctxBarImod = document.querySelector("#avg-bar-chart2").getContext("2d");
    new Chart(ctxBarImod, {
        type: 'bar',
        data: {
            labels: labels,  // Year labels
            datasets: [{
                label: 'Avg Shares for "Imod" Sentiment',
                data: values,  // Average shares
                borderColor: [borderColorOne],
                backgroundColor: backgroundColorOne,
                borderWidth: 1,
                borderRadius: 6,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Average Shares on posts that are Against',
                    color: "white"
                },
                tooltip: {
                    backgroundColor: "black",
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 200,
                    ticks: {
                        color: "white"
                    }},
                x: {
                    ticks: {
                        color: "white"
                    }
                }
            }
        }
    });
}

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



