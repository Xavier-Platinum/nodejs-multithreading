import { parentPort, workerData } from "node:worker_threads";

let counter = 0;
console.log(parseInt(process.hrtime().join("")))

for(let i = 0; i < parseInt(process.hrtime().join(""))/workerData.thread_count; i++) {
    counter++;
}

parentPort.postMessage(counter);
