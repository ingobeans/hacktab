// handles loading, parsing and displaying widgets

function format(str, values) {
    return str.replace(/{(.+)}/g, function (match, index) {
        return typeof values[index] !== 'undefined' ? values[index] : match;
    });
}

function updateSettingInput(element, key) {
    let setting = element.getAttribute("linkedsetting");
    let value = element.value;
    localStorage.setItem(key + "/" + setting, value);
}

let widgetSettingsContainer = document.getElementById("widget-settings-container");

for (let [k, v] of Object.entries(widgets)) {
    let widgetElement = document.createElement("div");
    widgetElement.innerHTML = format(v["html"], { text: "<br><br>hello world" });;

    let settingsElement = document.createElement("div");
    settingsElement.innerHTML = v["settings"];
    settingsElement.id = k + "-setting";
    for (let child of settingsElement.children) {
        if (child.tagName == "INPUT" && child.hasAttribute("linkedsetting")) {
            child.addEventListener("input", () => { updateSettingInput(child, k) });
        }
    }

    document.body.appendChild(widgetElement);
    widgetSettingsContainer.appendChild(settingsElement);
}