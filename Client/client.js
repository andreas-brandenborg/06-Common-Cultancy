const dataDOM = document.querySelector("#data");

fetch("http://localhost:3000/test")
    .then(response => response.json())
    .then(data => {
        const dataText = data[0].all_post_text;
        const paragraphElement = document.createElement("p");
        const paragraphText = document.createTextNode(dataText);
        paragraphElement.appendChild(paragraphText);
        dataDOM.appendChild(paragraphElement);
    });