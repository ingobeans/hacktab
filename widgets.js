// handles loading, parsing and displaying widgets

let widgetSettingsContainer = document.getElementById("widget-settings-container");
let widgetsContainer = document.getElementById("widgets-container");

function format(str, values, undefinedLookup = (key) => { return `<undefined ${key}>` }) {
    return str.replace(/{(.+)}/g, function (match, index) {
        return typeof values[index] !== 'undefined' ? values[index] : undefinedLookup(index);
    });
}

function formatWidget(str, values, widgetKey) {
    return format(str, values, findDefaultSettingValue.bind(null, widgetKey))
}

let defaultSettings = {};

function findDefaultSettingValue(widgetKey, settingKey) {
    return defaultSettings[widgetKey + "/" + settingKey]
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
    element.innerHTML = formatWidget(widgets[key]["html"], getWidgetSettingsFromLocalStorage(key), key);
    eval(widgets[key]["script"]);
}

function updateSettingInput(element, key, dontReload = false) {
    let setting = element.getAttribute("linkedsetting");
    let value = element.value;
    localStorage.setItem(key + "/" + setting, value);

    if (!dontReload)
        reloadWidget(key);
}

for (let [k, v] of Object.entries(widgets)) {
    let settingsElement = document.createElement("div");
    settingsElement.innerHTML = v["settings"];
    settingsElement.id = k + "-setting";
    settingsElement.classList.add("widget-setting");
    for (let child of settingsElement.children) {
        if (child.hasAttribute("linkedsetting")) {
            child.addEventListener("input", () => { updateSettingInput(child, k) });
            defaultSettings[k + "/" + child.getAttribute("linkedsetting")] = child.value;

            // apply stored value if it exists
            let storedValue = localStorage.getItem(k + "/" + child.getAttribute("linkedsetting"));
            if (storedValue) {
                child.value = storedValue;
            }
        }
    }

    widgetSettingsContainer.appendChild(settingsElement);

    let widgetElement = document.createElement("div");
    widgetElement.innerHTML = formatWidget(v["html"], getWidgetSettingsFromLocalStorage(k), k);
    widgetElement.id = k + "-widget";
    widgetsContainer.appendChild(widgetElement);

    eval(v["script"]);
}