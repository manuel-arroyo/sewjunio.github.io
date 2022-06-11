"use strict";
class Util {
    constructor() { }
    
    initializateCart() {
        if (localStorage.cart == undefined || localStorage.cart == "") {
            localStorage.cart = JSON.stringify([]);
        }
    }
    // Just for debugger optimization
    clearCart(){
        localStorage.cart = JSON.stringify([]);
    }
    initializate(){
        this.initializateCart();
    }

}
var util = new Util();
$(document).ready(function () {
    util.initializate();
})