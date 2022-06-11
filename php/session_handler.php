<?php
include 'session.php';

class LocalSessionHandler {
    private $crud;

    function __construct() {
        $this -> crud = new Session();
    }

    function handlePetition() {
        if(isset($_POST["action"])) {
            if($_POST["action"] == "Login") {
                echo $this -> crud -> get_user($_POST['username'], $_POST['password']);
            }
        
            elseif($_POST["action"] == "Register") {
                echo $this -> crud -> create_user($_POST['username'], $_POST['email'], $_POST['password']);
            }
        }
    }
}

$handler = new LocalSessionHandler();
$handler -> handlePetition();

?>
