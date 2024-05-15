"use strict";

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = 3000;


// Have the http server listen on PORT
http.listen(PORT, function(){
    console.log(`Listen on Port ${PORT}`);
})

// Middleware for handling cookies
app.use(cookieParser());

// Parse URL-encoded form data and make it available in request.body
app.use(express.urlencoded( {extended: true} ));

// Send static files to the client
app.use(express.static(path.join(__dirname, "public")));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Provide file on GET-request on '/'
app.get("/", (req, res) => {
    if(req.cookies.username !== undefined)
        res.redirect("/chat");
    else
        res.sendFile(path.join(__dirname, "views/login.html"));
})

// Provides file on GET-request on '/chat'
app.get("/chat", (req, res) => {
    if(req.cookies.username !== undefined)
            res.sendFile(path.join(__dirname, "views/chat.html"));
    else
        res.redirect("/");
})

// Handle form data from '/'
app.post("/", (req, res) => {
    validate_form(req.body.username, req.body.password, res)
})

// Handle form data from '/chat'
app.post("/chat", (req, res) => {
    if(validate_message(req.body.message, res))
        handle_message(req.body.message);
})

// reset cookies
app.get("/reset", (req, res) => {
    for(const [key, value] of Object.entries(req.cookies)){
        if(key)
            res.clearCookie(key);
    }
    res.redirect("/");
})

// Validate form input
function validate_form(username, password, res){
    if(username.length === 0|| password.length === 0)
        res.send("No valid username or password!");
    else{
        set_cookies(res, {"username": username});
        res.redirect("/chat");
    }
}

// Validate message
function validate_message(message, res){
    if(message.length === 0)
        res.send("You did not provide a message!");
    return true;
}

// Send message to all connected users
function handle_message(message){
    io.emit("recieveMessage", message);
}

// set cookies
function set_cookies(res, obj){
    for(const [key, value] of Object.entries(obj)){
        res.cookie(key, value, { maxAge: 7200000, httpOnly: true });
    }
}

// Handle user connections
io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("error", (error) => {
        console.error("Socket error:", error);
    })
})