// handles loading, parsing and displaying widgets

function format(str, values) {
    return str.replace(/{(.+)}/g, function (match, index) {
        return typeof values[index] !== 'undefined' ? values[index] : match;
    });
}

function getWidgetSettingsFromLocalStorage(key) {
    let settings = {};
    for (let [k, v] of Object.entries(localStorage)) {
        if (k.startsWith(key + "/")) {
            settings[k.slice(k.indexOf("/") + 1)] = v;
        }
    }
    return settings;
}

function reloadWidget(key) {
    let element = document.getElementById(`${key}-widget`);
    if (!element) {
        console.error(`Key ${key} doesn't exist`);
        return
    }
    element.innerHTML = format(widgets[key]["html"], getWidgetSettingsFromLocalStorage(key));
}

function updateSettingInput(element, key) {
    let setting = element.getAttribute("linkedsetting");
    let value = element.value;
    localStorage.setItem(key + "/" + setting, value);
    reloadWidget(key);
}

let widgetSettingsContainer = document.getElementById("widget-settings-container");

for (let [k, v] of Object.entries(widgets)) {
    let widgetElement = document.createElement("div");
    widgetElement.innerHTML = format(v["html"], getWidgetSettingsFromLocalStorage(k));
    widgetElement.id = k + "-widget";

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