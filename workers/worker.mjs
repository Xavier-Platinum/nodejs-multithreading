import { parentPort } from "node:worker_threads";

let counter = 0;
const numcount = parseInt(process.hrtime().join(""));

for(let i = 0; i < numcount; i++) {
    counter++;
}

parentPort.postMessage(counter);
