"use strict";

let form_ref = document.querySelector("form");

form_ref.addEventListener("submit", send_message);

// send message to server
function send_message(e){
    let message_ref = this.querySelector("input[type=text]");

    try{
        if(message_ref.value.length === 0)
            throw { "elemref": message_ref, "message": "Message cannot be empty!" };
        if(this.querySelector("#error").firstChild)
            this.querySelector("#error").textContent = "";
    }
    catch(oError){
        e.preventDefault();

        this.querySelector('#error').textContent = oError.message;

        oError.elemref.focus();
    }
}