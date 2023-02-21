import express from "express";
import http from "http";
import { Worker } from "node:worker_threads";
// import worker from "./workers/worker.mjs";
const THREAD_COUNT = 4;

const app = express();

app.get("/non-blocking", async(req, res) => {
    res.status(200).send("Response received on time : " + process.hrtime());
});

async function createWorker(){
    return new Promise(async(resolve, reject) => {
        const worker = new Worker("./workers/worker.mjs", {
            workerData: {
                thread_count: THREAD_COUNT
            }
        });

        worker.on("message", async(data) => {
            resolve(data)
        });
    
        worker.on("error", async(error) => {
            reject(error)
        });
    });
}

app.get("/blocking", async(req, res) => {
    const workerPromises = [];

    for (let i=0; i < THREAD_COUNT; i++) {
        workerPromises.push(createWorker());
    }

    const thread_results = await Promise.all(workerPromises);
    const results = [...thread_results]
    return res.status(200).send(`Result is ${results}`);
})

const server = http.createServer(app);
server.listen(process.env.PORT || 8000, async() => {
    console.log(`Server listening on port ${process.env.PORT || 8000}`);
}) 
