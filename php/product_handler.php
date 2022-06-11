<?php
include 'products.php';

class ProductHandler {
    private $crud;

    function __construct() {
        $this -> crud = new Products();
    }

    function handlePetition() {
        if(isset($_POST["action"])) {
            if($_POST["action"] == "Load") {
                echo $this -> crud->get_products_styled("SELECT * FROM products ORDER BY id DESC");
            }
        
            if($_POST["action"] == "Delete") {
                echo $this -> crud->execute_query("DELETE FROM products WHERE `products`.`id` = '".$_POST["product_id"]."'");
            }
        
            if($_POST["action"] == "Show")  {
                echo $this -> crud->get_product_styled("SELECT * FROM products WHERE id = '".$_POST["product_id"]."'");
            }
        
            if($_POST["action"] == "Get")  {
                echo $this -> crud->get_list_item_products($_POST["product_ids"]);
            }
        
            if($_POST["action"] == "Insert")  {
                echo $this -> crud->insert_products($_POST["products"]);
            } 
        }
    }
}

$handler = new ProductHandler();
$handler -> handlePetition();
?>