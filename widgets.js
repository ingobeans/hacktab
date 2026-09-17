// handles loading, parsing and displaying widgets

let widgetSettingsContainer = document.getElementById("widget-settings-container");
let widgetsContainer = document.getElementById("widgets-container");
let addWidgetSelect = document.getElementById("add-widget-select");

function format(str, values, undefinedLookup = (key) => { return `<undefined ${key}>` }) {
    return str.replace(/{(.+)}/g, function (match, index) {
        return typeof values[index] !== 'undefined' ? values[index] : undefinedLookup(index);
    });
}

function capitalizeFirst(text = "") {
    return text.charAt(0).toUpperCase() + text.slice(1)
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

function showWidgetSetting(key) {
    let v = widgets[key];

    let settingsElement = document.createElement("div");
    settingsElement.innerHTML = `<h2>${capitalizeFirst(key)}</h2><hr>`;
    settingsElement.innerHTML += v["settings"];
    settingsElement.id = key + "-setting";
    settingsElement.classList.add("widget-setting");
    for (let child of settingsElement.children) {
        if (child.hasAttribute("linkedsetting")) {
            child.addEventListener("input", () => { updateSettingInput(child, key) });
            defaultSettings[key + "/" + child.getAttribute("linkedsetting")] = child.value;

            // apply stored value if it exists
            let storedValue = localStorage.getItem(key + "/" + child.getAttribute("linkedsetting"));
            if (storedValue) {
                child.value = storedValue;
            }
        }
    }

    widgetSettingsContainer.appendChild(settingsElement);
}

function showWidget(key) {
    let v = widgets[key];

    let widgetElement = document.createElement("div");
    widgetElement.innerHTML = formatWidget(v["html"], getWidgetSettingsFromLocalStorage(key), key);
    widgetElement.id = key + "-widget";
    widgetsContainer.appendChild(widgetElement);

    eval(v["script"]);
}

function clickWidgetSelect() {
    let key = addWidgetSelect.value;
    addWidgetSelect.value = "Add new Widget";
    showWidgetSetting(key);
    showWidget(key);

    let option = addWidgetSelect.querySelector(`[value="${key}"]`);
    option.remove();
}

let enabledWidgets = ["text"];

for (let [key, v] of Object.entries(widgets)) {
    if (!enabledWidgets.includes(key)) {
        let option = document.createElement("option");
        option.innerText = capitalizeFirst(key);
        option.setAttribute("value", key);
        addWidgetSelect.appendChild(option);
        continue
    }
    showWidgetSetting(key);
    showWidget(key);
}