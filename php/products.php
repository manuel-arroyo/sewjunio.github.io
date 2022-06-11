<?php
include ("config.php");
class Products {
    private $db;

    function __construct() {
        $this -> db = new Database();
    }

    public function execute_query($query) {      
      $this -> db -> connect_db();
      return $this->db->con->query($query);
    }

    public function get_list_item_products($pruduct_array) {
      $this -> db -> connect_db();
      $output = '';

      for ($i = 0; $i < count($pruduct_array); $i++) { 
        $id = $pruduct_array[$i];

        $query = "SELECT * FROM products WHERE id = {$id}"; 

        
        if ($result = $this->execute_query($query)) {
          while($row = $result -> fetch_object()) {
            $output .= '
            <li>
                <img src="'.$row->img_link.'"  alt="Product img">
                <p>'.$row->name.'</p>  
                <p>'.$row->price.' €</p> 
            </li>';
          }

        }
      }
      $this -> db -> close_db();
      return $output;
  }

  public function insert_products($products) {
    $this -> db -> connect_db();

    $products = $_POST['products'];
    for ($i = 0; $i < count($products); $i++) {
      $product = $products[$i];
       
      $stmt = $this->db->con->prepare("INSERT INTO products(name, price, img_link, description, stock) VALUES (?,?,?,?,?)");
      $stmt->bind_param("sdssb", $name, $price, $img_link, $description, $stock);


      $name = $product[0];
      $price = $product[1];
      $img_link = $product[2];
      $description = $product[3];
      $stock = 1;
      $stmt->execute();
      $stmt->close();   
    }

    $this -> db -> close_db();  
  }
}
?>