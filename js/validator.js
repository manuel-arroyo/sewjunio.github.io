"use strict";
class Validator {
    constructor() { }    

    checkRegister() {
        var form = document.getElementById("form-register");
        
        let no_errors = true;
        if(form){
            // Valida name, mostrando los mensajes mas críticos primero.
            let nameInput = form.elements[0];
            if(nameInput.value.length >= 32) {
                nameInput.value = "";             
                nameInput.nextElementSibling.textContent = "Nombre demasiado largo."; 
                no_errors = false;
            } else if(nameInput.value.length <= 2) {
                nameInput.value = "";
                nameInput.nextElementSibling.textContent = "Nombre demasiado corto."; 
                no_errors = false;  
            }else {
                nameInput.nextElementSibling.textContent = "";
            }
            
            // Valida email, mostrando los mensajes mas críticos primero.
            let emailInput = form.elements[1];
            if(emailInput.value.length >= 255 ) {
                emailInput.value = "";
                emailInput.nextElementSibling.textContent = "Correo electrónico demasiado largo.";  
                no_errors = false;     
            }else if(emailInput.value.length <= 2 ) {
                emailInput.value = "";
                emailInput.nextElementSibling.textContent = "Correo electrónico demasiado corto.";
                no_errors = false;
            } else if(!(emailInput.value.includes("@") && emailInput.value.includes("."))) {
                emailInput.value = "";
                emailInput.nextElementSibling.textContent = "Correo electrónico incorrecto.";
                no_errors = false;
            }else {
                emailInput.nextElementSibling.textContent = "";
            }

            // Valida contraseña, mostrando los mensajes mas críticos primero.
            let passwordInput = form.elements[2];
            let passwordConfirmInput = form.elements[3];
            if(passwordInput.value != passwordConfirmInput.value) {                
                passwordInput.value = "";
                passwordInput.nextElementSibling.textContent = "Las contraseñas no coinciden";
                no_errors = false;
            }else if(passwordInput.value.length >= 255 ) {                
                passwordInput.value = "";
                passwordInput.nextElementSibling.textContent = "Contraseña demasiado larga.";
                no_errors = false;
            }else if(passwordInput.value.length < 8 ) {                
                passwordInput.value = "";
                passwordInput.nextElementSibling.textContent = "Contraseña demasiado corta.";
                no_errors = false;
            }else {
                passwordInput.nextElementSibling.textContent = "";
            }
        }
        else{
            console.log("No se ha encontrado el formulario...");
            no_errors = false;
        }
        return no_errors;
    }

    checkLogin() {
        var form = document.getElementById("form-login");
        
        let no_errors = true;
        if(form != undefined){
            let nameInput = form.elements[0];
            if(nameInput.value.length <= 0) {                
                nameInput.value = "";
                nameInput.nextElementSibling.textContent = "El nombre no puede estar vacío.";        
                no_errors = false;
            } else {
                nameInput.nextElementSibling.textContent = "";
            }

            let passwordInput = form.elements[1];
            if(passwordInput.value.length <= 0 ) {                
                passwordInput.value = "";
                passwordInput.nextElementSibling.textContent = "La contraseña no puede estar vacía";        
                no_errors = false;
            } else {
                passwordInput.nextElementSibling.textContent = "";
            }
        } else {
            console.log("No se ha encontrado el formulario...");
        }
        return no_errors;
    }
}
var validator = new Validator();
