"use strict";

let socket = io();

socket.on("recieveMessage", function(message){
    appendMessage(message);
})

function appendMessage(message){
    let new_message = document.createElement("li");
    new_message.setAttribute("class", "list-group-item");
    new_message.textContent = message;
    document.querySelector("#chat").appendChild(new_message);
}