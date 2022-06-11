"use strict";
class Products {
    constructor() {
        this.rol = "CLIENTE"
    }

    loadData() {
        var action = "Load";
        $.ajax({
            url: "/sewjunio.github.io/php/product_handler.php",
            method: "POST",
            data: { action: action },
            success: function(data) {
               // $('#products-container').html(data);
            }
        });
    }

    deleteProduct(id) {
        debugger
        var action = "Delete";
        $.ajax({
            url: "/sewjunio.github.io/php/product_handler.php",
            method: "POST",
            data: {
                action: action,
                product_id: id
            },
            success: function(data) {
                console.log(data);
                location.reload(); 
            }
        });
    }

    addToCart(product_id) {
        let amount = $("#cantidad_"+product_id)[0].value;
        let storedCart = JSON.parse(localStorage.cart);
        storedCart.push({
            product_id: product_id,
            amount: amount
        });
        localStorage.cart = JSON.stringify(storedCart);
    }

    loadAdminFunctions() {
        // Si el usuario es admin se añade un label un input y un boton a 
        // la pagina de productos. Elementos necesarios para importar un pedido
        if (localStorage.session == "ADMIN") {
            let self = this;
            let section = $("main")[0].firstElementChild;

            let label = document.createElement("label");
            label.setAttribute("for", "xml_import");
            label.textContent = "Importar xml";
            section.insertBefore(label, section.children[1]);

            let input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("id", "xml_import");
            input.setAttribute("name", "xml_import");
            input.setAttribute("accept", "text/xml");
            input.onchange = function() { self.loadXMLFile(this.files); }
            section.insertBefore(input, section.children[2]);

            let button = document.createElement("button");
            button.setAttribute("id", "import_btn");
            button.textContent = "Importar Pedido";
            button.onclick = function() { $("#xml_import").click(); }
            section.insertBefore(button, section.children[3]);        
            
            let sections = $("main")[0].children;
            for (let i =1; i < sections.length; i++) {
                sections[i].removeChild(sections[i].children[5]);
                sections[i].removeChild(sections[i].children[4]);
                sections[i].removeChild(sections[i].children[3]);
                let product_id = parseInt(sections[1].children[3].id);

                let delete_button = document.createElement("button");
                delete_button.setAttribute("name", "delete");
                delete_button.textContent = "Eliminar producto";
                delete_button.onclick = function() { self.deleteProduct(product_id);}
                sections[i].insertBefore(delete_button, sections[i].children[3]); 
            }
        }

    }

    //Lee el fichero xml y lo parsea
    loadXMLFile(file) {
        debugger
        let reader = new FileReader();

        for (let i = 0; i < file.length; i++) {
            reader.readAsText(file[0]);
            let self = this;
            reader.onload = function(e) {
                let xmlToParse = reader.result;
                let xmlDoc = jQuery.parseXML(xmlToParse);
                self.saveXML(xmlDoc);
            };
            reader.onerror = function() {
                console.log(reader.error);
            };
        }
    }
    
    //Recorre el fichero, crea productos y los guarda
    saveXML(xmlDoc) {
        let products = [];
        let lotes = xmlDoc.getElementsByTagName("pedido")[0].getElementsByTagName("lotes");
        for (let i = 0; i < lotes.length; i++) {
            let productos = lotes[i].getElementsByTagName("productos")[0].getElementsByTagName("producto");
            for (let j = 0; j < productos.length; j++) {
                let producto = productos[j];
                // Si hay stock lo metemos en la bbdd
                if (producto.attributes[0].nodeValue == "true") {

                    products.push([
                        producto.getElementsByTagName("nombre")[0].textContent,
                        parseInt(producto.getElementsByTagName("precio")[0].textContent),
                        producto.getElementsByTagName("img_link")[0].textContent,
                        producto.getElementsByTagName("descripcion")[0].textContent
                    ]);
                }
            }
        }

        var action = "Insert";
        if (products.length > 0) {
            $.ajax({
                url: "/sewjunio.github.io/php/product_handler.php",
                method: "POST",
                data: {
                    action: action,
                    products: products
                },
                success: function(data) {
                    console.log(data);
                    location.reload(); 
                }
            });
        }
    }

    initialize() {
        this.loadData();
        this.loadAdminFunctions();
    }


}
var products = new Products();
$(document).ready(function() {
    products.initialize();
});