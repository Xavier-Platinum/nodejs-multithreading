import express from "express";
import http from "http";
import { Worker } from "node:worker_threads";
// import worker from "./workers/worker.mjs";

const app = express();

app.get("/non-blocking", async(req, res) => {
    res.status(200).send("Response received on time : " + process.hrtime());
});

app.get("/blocking", async(req, res) => {
    const worker = new Worker("./workers/worker.mjs");

    worker.on("message", async(data) => {
        return res.status(200).send(`Result data ${data}`)
    });

    worker.on("error", async(error) => {
        return res.status(404).send(`Error occured ${error}`)
    });
})

const server = http.createServer(app);
server.listen(process.env.PORT || 8000, async() => {
    console.log(`Server listening on port ${process.env.PORT || 8000}`);
}) 
