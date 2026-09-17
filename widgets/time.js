let timeCounter = document.getElementById("time-counter");

function updateTimeCounter() {
    if (!timeCounter.isConnected) {
        return;
    }
    let date = new Date(Date.now());
    let text = date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0")
    if (true) {
        text += ":" + date.getSeconds().toString().padStart(2, "0")
    }
    timeCounter.innerText = text;
    setTimeout(updateTimeCounter, 100);
}
updateTimeCounter()