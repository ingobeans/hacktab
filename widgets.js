// handles loading, parsing and displaying widgets

function format(str, values) {
    return str.replace(/{(.+)}/g, function (match, index) {
        return typeof values[index] !== 'undefined' ? values[index] : match;
    });
}

for (let [k, v] of Object.entries(widgets)) {
    document.body.innerHTML += format(v, { text: "<br><br>hello world" });
}