const scrollElementDOM = document.querySelector("#scroll-element");


window.addEventListener("wheel", () => {
    if(event.deltaY < 0) {
        scrollElementDOM.style.top = scrollElementDOM.style.top + 5;
        console.log("Scroll up");
    }
    else {
        console.log(scrollElementDOM.style.backgroundColor);
        console.log("Scroll down");
    }
});