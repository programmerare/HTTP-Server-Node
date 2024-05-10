"use strict";

const express = require("express");
const http = require("http");
const io = require("socket.io");

const PORT = 3000;

let app = express();
http.createServer(app);
io(http);

app.listen(PORT, function(req, res){
    console.log(`Listening on port ${PORT}`);
})

app.use("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});