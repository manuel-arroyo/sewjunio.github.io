<?php
include ("config.php");
class Session {
    private $db;

    function __construct() {
        $this -> db = new Database();      
    }

    public function execute_query($query) {
        return $this->db->con->query($query);
    }

    public function get_user($username, $password) {
        $this -> db -> connect_db();

        $output = '';
        $query = "SELECT rol, id FROM users WHERE username = '{$username}' and password = '{$password}'";
        
        if ($result = $this->execute_query($query)) {
            while($row = $result -> fetch_object()) {
                $output .= json_encode($row);
            }
        }

        $this -> db -> close_db();  
        return $output;
    }

    public function create_user($given_username, $email_username, $password_username) {
        $this -> db -> connect_db();

        $stmt = $this->db->con->prepare("INSERT INTO users (username, email, password) VALUES (?,?,?)");
        $stmt->bind_param("sss", $username, $email, $password);
  
        $username = $given_username;
        $email = $email_username;
        $password = $password_username;
        $stmt->execute();
        $stmt->close(); 

        $this -> db -> close_db();  
      }
}
?>