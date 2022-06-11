<?php
    class Database {
        public $con;
        private $dbhost = 'localhost';
        private $dbuser = 'DBUSER2021';
        private $dbpass = 'DBPSWD2021';
        private $dbname = 'dbsew2022';

        function __construct(){
        }

        public function connect_db(){
            $this->con = new mysqli($this->dbhost, $this->dbuser, $this->dbpass, $this->dbname);

            if ($this->con->connect_errno) {
                echo "Falló la conexión a MySQL: (" . $this->con->connect_errno . ") " . $this->con->connect_error;
            }
        }

        public function close_db() {
            $this->con-> close();
        }

    }
?>