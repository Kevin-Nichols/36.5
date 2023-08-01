/** Command-line tool to generate Markov text. */

const markov = require("./markov");
const fs = require("fs");
const process = require("process");
const axios = require("axios");

function createText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText()); 
}

function readText(path){
    fs.readFile(path, "utf8", (err, data) => {
        if(err){
            console.error(`Error reading file: ${path}: \n ${err}`);
            process.exit(1);
        } else {
            createText(data);
        }
    });
}

async function readURL(url){
    let res;
    try{
        res = await axios.get(url);
    } catch (err) {
        console.error(`Error reading URL: ${url}: \n ${err}`);
        process.exit(1);
    }
    createText(res.data);
}

let [method, path] = process.argv.slice(2);

if(method === "file"){
    readText(path);
}
else if(method === "url"){
    readURL(path);
}
else{
    console.error(`Invalid method: ${method}`);
    process.exit(1);
}