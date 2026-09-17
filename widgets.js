// handles loading, parsing and displaying widgets

let widgetSettingsContainer = document.getElementById("widget-settings-container");
let widgetsContainer = document.getElementById("widgets-container");

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

function updateSettingInput(element, key, dontReload = false) {
    let setting = element.getAttribute("linkedsetting");
    let value = element.value;
    localStorage.setItem(key + "/" + setting, value);

    if (!dontReload)
        reloadWidget(key);
}

for (let [k, v] of Object.entries(widgets)) {
    let widgetElement = document.createElement("div");
    widgetElement.innerHTML = format(v["html"], getWidgetSettingsFromLocalStorage(k));
    widgetElement.id = k + "-widget";

    let settingsElement = document.createElement("div");
    settingsElement.innerHTML = v["settings"];
    settingsElement.id = k + "-setting";
    for (let child of settingsElement.children) {
        if (child.hasAttribute("linkedsetting")) {
            child.addEventListener("input", () => { updateSettingInput(child, k) });

            // apply stored value if it exists
            let storedValue = localStorage.getItem(k + "/" + child.getAttribute("linkedsetting"));
            if (storedValue) {
                child.value = storedValue;
            }
        }
    }

    widgetsContainer.appendChild(widgetElement);
    widgetSettingsContainer.appendChild(settingsElement);
}