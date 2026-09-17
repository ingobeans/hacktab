#!/usr/bin/env node

// compiles directory of widgets/ to a single JS file

const fs = require('fs');
const path = require('path');

let widgetsBase = "./widgets/";

let data = {};

let items = fs.readdirSync(widgetsBase);
for (let item of items) {
    let itemPath = path.join(widgetsBase, item);

    // check if item is file
    let stats = fs.statSync(itemPath);

    if (stats.isDirectory())
        continue

    let filename = item.slice(0, item.lastIndexOf("."));

    let contents = fs.readFileSync(itemPath, "utf-8");
    data[filename] = contents;
}

console.log(data);