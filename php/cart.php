<?php
include ("config.php");
class Cart {
    private $db;

    function __construct() {
      $this -> db = new Database();
    }

    public function execute_query($query) {
      return $this->db->con->query($query);
    }

    public function create_products_to_buy($cart) {
      $this -> db -> connect_db();
      
      $prod_count = count($cart);
      for ($i = 0; $i < $prod_count; $i++) { 
        $product_to_buy = $cart[$i];

        $stmt = $this->db->con->prepare("INSERT INTO product_to_buy (product_id, amount) VALUES (?,?)");
        $stmt->bind_param("id", $prod_id, $amount);
  
        $prod_id = intval($product_to_buy["product_id"]);
        $amount = intval($product_to_buy["amount"]);
        $stmt->execute();
        $stmt->close(); 
      }      
      $this -> db -> close_db();  
      
    }

    public function create_invoice($prod_count, $given_user_id, $given_total, $given_direction) {
      $this -> db -> connect_db();
      $result = $this->execute_query("SELECT id FROM product_to_buy ORDER BY id DESC LIMIT {$prod_count}");
      
      while($row = mysqli_fetch_object($result)) {
        $last_id = $row -> id;

        $stmt = $this->db->con->prepare("INSERT INTO invoices (product_to_buy_id, user_id, total, direction) VALUES (?,?,?,?)");
        $stmt->bind_param("iids", $product_id, $user_id, $total, $direction);
  
        $product_id = $last_id;
        $user_id = $given_user_id;
        $total = $given_total;
        $direction = $given_direction;
        $stmt->execute();
        $stmt->close(); 
      }
      $this -> db -> close_db();  
    }
}
?>