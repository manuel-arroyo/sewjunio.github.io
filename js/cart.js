"use strict";
class Cart {
    constructor() {
        this.rol = "CLIENTE"
    }

    loadCart() {
        if (JSON.parse(localStorage.cart).length > 0) {
            let product_ids = JSON.parse(localStorage.cart).map(e => e.product_id);
            var action = "Get";
            $.ajax({
                url: "/php/product_handler.php",
                method: "POST",
                data: {
                    action: action,
                    product_ids: product_ids
                },
                success: function(data) {
                    $('#cart-list').html(data);
                    cart.calculateTotal();
                }
            });
        } else {
            $('#cart-list').html('<p>Carrito vacío</p>');
        }
    }

    calculateTotal() {
        let units = JSON.parse(localStorage.cart).map(e => e.amount);
        let items = $("#cart-list")[0].children;
        let total = 0;
        let self = this;

        for (let i = 0; i < units.length; i++) {
            // Aprovechamos para incluir la cantidad
            let cantidad = document.createElement("p");
            cantidad.textContent = "Uds. "+ units[i];
            items[i].appendChild(cantidad);


            // Aprovechamos para incluir el boton de eliminar
            let remove_btn = document.createElement("a");
            remove_btn.innerHTML = ' <img src="/public/img/icons/papelera-de-reciclaje.png" alt ="Eliminar">';
            remove_btn.onclick = function() {
                self.removeFromCart(i);
            }
            items[i].appendChild(remove_btn);


            let price = items[i].children[2].innerHTML;
            total += units[i] * parseInt(price.slice(0, -2));

        }

        $("#total-amout").val(total + "€");
    }

    removeFromCart(cart_index) {
        let storedCart = JSON.parse(localStorage.cart);
        storedCart.splice(cart_index, 1);
        localStorage.cart = JSON.stringify(storedCart);
        this.loadCart();
    }

    saveProductsToBuy(cart, user_id, total, direction) {
        var action = "Create";
        let self = this;
        $.ajax({
            url: "/php/cart_handler.php",
            method: "POST",
            data: {
                action: action,
                cart: cart
            },
            success: function(data) {
                self.createInvoice(cart.length, user_id, total, direction);
                console.log("Create products to buy: Success");
            }
        });
    }

    createInvoice(prod_count, user_id, total, direction) {
        var action = "Invoice";
        $.ajax({
            url: "/php/cart_handler.php",
            method: "POST",
            data: {
                action: action,
                user_id: user_id,
                total: total,
                direction: direction,
                prod_count: prod_count
            },
            success: function(data) {
                util.clearCart();
                window.location.pathname = "/html/purchased.html";
                console.log("Create products to buy: Success");
            }
        });
    }

    finish() {
        //obtenemos direccion
        let direction = $("#direction")[0].value;
        //obtenemos total
        let total = parseFloat(($("#total-amout").val()));
        //obtenemos id usuario
        let user_id = parseInt(localStorage.id);

        let cart = JSON.parse(localStorage.cart);
        this.saveProductsToBuy(cart, user_id, total, direction);
    }

    initialize() {
        this.loadCart();
    }


}
var cart = new Cart();
$(document).ready(function() {
    cart.initialize();
});