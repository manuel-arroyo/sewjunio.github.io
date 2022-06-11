<?php
include 'cart.php';

class CartHandler {
    private $crud;

    function __construct() {
        $this -> crud = new Cart();
    }

    function handlePetition() {
        if(isset($_POST["action"])) {
            if($_POST["action"] == "Load") {
                echo $this -> crud ->get_products_styled("SELECT * FROM products ORDER BY id DESC");
            }
        
            if($_POST["action"] == "Create") {
                echo json_encode($this -> crud ->create_products_to_buy($_POST["cart"]));
            }
        
            if($_POST["action"] == "Invoice")  {
                echo json_encode($this -> crud ->create_invoice($_POST["prod_count"], $_POST["user_id"], $_POST["total"], $_POST["direction"]));
            }
        }
    }
}

$handler = new CartHandler();
$handler -> handlePetition();

?>