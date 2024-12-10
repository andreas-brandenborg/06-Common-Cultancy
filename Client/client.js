const dataDOM = document.querySelector("#data");

displayFirstPost()
createLineChart()

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





function createLineChart () {

        const ctx = document.querySelector('#chart').getContext('2d');
        new Chart(ctx, {
                type: 'line',
                data: {
                        datasets: [{
                                label: 'Total interaktioner',
                                data: [1,2,3,4],
                                borderColor: ['#ff0000']
                        }
                                ],
                        labels: ['1', '2', '3', '4']
                },
                options: {
                        plugins: {
                                title: {
                                        display: true,
                                        text: 'TikTok vs Youtube views'
                                },
                                legend: {
                                        position: 'bottom'
                                }
                        }
                }
        })
}
