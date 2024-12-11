const dataDOM = document.querySelector("#data");

displayFirstPost();

displaySecondPost();


function displayFirstPost ()  {
        fetch("http://localhost:3000/test")
            .then(response => response.json())
            .then(data => {
                    const dataText = data[0].all_post_text;
                    const paragraphElement = document.createElement("p");
                    const paragraphText = document.createTextNode(dataText);
                    paragraphElement.appendChild(paragraphText);
                    dataDOM.appendChild(paragraphElement);

            })
}

fetchMonthData = [];
fetchInteractions = [];

async function displaySecondPost() {
        fetch("http://localhost:3000/total-interactions")
            .then(response => response.json())
            .then(data => {

                    for (let i = 0; i < data.length; i++) {
                            fetchMonthData.push(data[i].yearmonth);
                            fetchInteractions.push(data[i].interactions_yearmonth);
                    }
            })
            .catch(error => {
                    console.error('Error fetching data:', error);
            });
}





        const ctx = document.querySelector('#chart').getContext('2d');
        const chart = new Chart(ctx, {
                type: 'line',
                data: {
                        datasets: [{
                                label: 'Total interaktioner',
                                data: fetchInteractions, // Use the yValue array for the chart data
                                borderColor: ['#ff0000']
                        }],
                        labels: fetchMonthData // Use the xValue array for the chart labels
                },
                options: {
                        plugins: {
                                title: {
                                        display: true,
                                        text: 'Total interaktioner'
                                },
                                legend: {
                                        position: 'bottom'
                                }
                        }
                }
        });

