<?php namespace Classes;

    use \mysqli;

    //handles the order id to be assigned to the new order
    class OrderIDHandler{

        private static $newID = [];

        public function process($laundryInitials){//main
            $lastID = [];
            $lastID = self::getLastOrderID($laundryInitials);

            self::incrementOrderID($lastID["idChar"], $lastID["idNumber"]);
        }

        function getLastOrderID($laundryInitials){
            
            //Connection param
            $serverName = "localhost";
            $userConn = "root";
            $passwordConn = "hola1234";
            $db = "tallao";

            $conn = new mysqli($serverName, $userConn, $passwordConn);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
            $sql = "SELECT idChar, idNumber FROM lastorderid WHERE laundryInitials='$laundryInitials' LIMIT 1";

            $result = mysqli_query($conn, $sql);
            
            $row = mysqli_fetch_assoc($result);
            
            return $row;
        }

        public function getNewLastOrderID(){
            return self::$newID;
        }

        public function updateLastOrderID($laundryInitials){
            //Connection param
            $serverName = "localhost";
            $userConn = "root";
            $passwordConn = "hola1234";
            $db = "tallao";

            $newLastChar = self::$newID["char"];
            $newLastNumber = self::$newID["number"];
            $conn = new mysqli($serverName, $userConn, $passwordConn);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
            
            $sql = "UPDATE lastorderid SET idChar = '$newLastChar', idNumber = '$newLastNumber' 
            WHERE laundryInitials = '$laundryInitials'";

            if(mysqli_query($conn, $sql)){
                return true;
            }else{
                return false;
                mysqli_error($conn);
            }
        }

        function incrementOrderID($char, $number){

            if(!defined("LIMIT_NUMBER")){
                define("LIMIT_NUMBER", 10000);
            }

            $newChar = trim($char);

            if($number == LIMIT_NUMBER){ 
                //advances to the next character at ASCII alphabet
                //always returns uppercase char
                $newNumber = 1;
                $newChar = strtolower($newChar);
                $newChar = ++ $newChar;
                $newChar = strtoupper($newChar);
            }else{
                //keeps the same char, while incrementing by one the number
                $newNumber = ++$number;
            }
            self::$newID["char"] = $newChar;
            self::$newID["number"] = $newNumber;
        }
        
    }

?>