"use strict";
class Session {
    constructor() {
        this.rol = "CLIENTE"
    }
    checkSession() {
        if (localStorage.session == undefined &&
            window.location.pathname == "/html/cart.html") {
            if (window.location.pathname != "/html/login.html" &&
                window.location.pathname != "/html/register.html") {
                window.location.pathname = "/html/login.html";

            }
        }
    }

    closeSession() {
        localStorage.session = undefined;
        localStorage.id = undefined;
        localStorage.cart = JSON.stringify([]);
        window.location.pathname = "/html/index.html";
    }

    /*Esta función edita los formularios para que hagan llamadas
    mediante ajax y no llamen directament a la url de destino */
    attachFormSubmiters() {
        this.attachLogSubmitter();
        this.attachRegisterSubmitter();
    }

    attachLogSubmitter() {
        $("#form-login").submit(function(event) {
            event.preventDefault();
            if (validator.checkLogin()) {
                let $form = $(this);
                let url = $form.attr('action');

                var posting = $.post(url, {
                    username: $('#username').val(),
                    password: $('#password').val(),
                    action: "Login"
                });

                posting.done(function(data) {
                    if (data.length <= 0) {
                        document.getElementById("login-feedback").innerHTML = "No se ha encontrado ningún usuario";
                    } else {
                        localStorage.session = JSON.parse(data).rol;
                        localStorage.id = JSON.parse(data).id;
                        window.location.pathname = "/html/index.html";
                    }
                });
            }
        });
    }

    attachRegisterSubmitter() {
        $("#form-register").submit(function(event) {
            event.preventDefault();
            if (validator.checkRegister()) {
                let $form = $(this);
                let url = $form.attr('action');

                var posting = $.post(url, {
                    username: $('#username').val(),
                    email: $('#email').val(),
                    password: $('#password').val(),
                    action: "Register"
                });

                posting.done(function(data) {
                    window.location.pathname = "/html/login.html";
                });
            }
        });
    }

    loadMenu() {
        if ($("nav")[0]) {
            var self = this;
            var ul =$("nav")[0].lastElementChild;
            if (localStorage.session == "ADMIN" || localStorage.session == "CLIENT") {
                let close_session = document.createElement("a");
                close_session.textContent = "Cerrar Sesion";
                close_session.onclick = function() { self.closeSession();}
                let hr = document.createElement("hr");
                let li = document.createElement("li");
                li.appendChild(close_session);
                li.appendChild(hr);                
                ul.insertBefore(li, ul.children[5]); 
                
                ul.removeChild(ul.children[7]);  
                ul.removeChild(ul.children[6]);
            }


        }
    }


}
var session = new Session();

$(document).ready(function() {
    session.checkSession();
    session.attachFormSubmiters();
    session.loadMenu();
})