var json2html = require("node-json2html");

let data = {
    "name": "daniel",
    "age": 34,
};
let transform = {
    "<>": "div", 
    html: [
    {'<>': 'p', html: "Name: ${name}"}, 
    {'<>': 'h1', html: "Age: ${age}"}
    ],
};
let html = json2html.transform(data, transform);
console.log(html.split('><').join('>\n<'));

