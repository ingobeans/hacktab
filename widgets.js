// handles loading, parsing and displaying widgets

function format(str, values) {
    return str.replace(/{(.+)}/g, function (match, index) {
        return typeof values[index] !== 'undefined' ? values[index] : match;
    });
}

let widgetSettingsContainer = document.getElementById("widget-settings-container");

for (let [k, v] of Object.entries(widgets)) {
    let widgetElement = document.createElement("div");
    widgetElement.innerHTML = format(v["html"], { text: "<br><br>hello world" });;

    let settingsElement = document.createElement("div");
    settingsElement.innerHTML = v["settings"];

    document.body.appendChild(widgetElement);
    widgetSettingsContainer.appendChild(settingsElement);
}