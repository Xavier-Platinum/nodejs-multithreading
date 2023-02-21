import express from "express";
import http from "http2";

const app = express();


const server = http.createServer(app);
server.listen(process.env.PORT || 8000, async() => {
    console.log(`Server listening on port ${process.env.PORT || 8000}`);
}) 
