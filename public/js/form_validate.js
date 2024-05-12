"use strict";

let form_ref = document.querySelector("form");

form_ref.addEventListener("submit", validate_form);

function validate_form(e){
    let email_ref = this.querySelector("input[type=text]");
    let password_ref = this.querySelector("input[type=password]");

    try{
        if(email_ref.value.length === 0)
            throw {"elemref": email_ref, "message": "Provide a username!"};
        if(password_ref.value.length < 10)
            throw {"elemref": password_ref, "message": "Password must be at least 10 characters long!"};
    }
    catch(oError){
        e.preventDefault();

        this.querySelector("#error").textContent = oError.message;

        oError.elemref.focus();
    }
}