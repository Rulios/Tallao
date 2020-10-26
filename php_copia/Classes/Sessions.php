<?php namespace Classes;

    use \mysqli; //reserving native php namespace

    class Sessions{

        function create($name, $value){
            session_start();
            $_SESSION[$name] = $value;
        }

        function destroyAll(){
            sesion_start();
            session_destroy();
        }

        public function readSession(){
            //since all the cookies that we have created on login have HTTPOnly
            //document.cookie will be erased. So no external user can input cookies or modify it.
            
            if($_SESSION && self::verifyIfExistUserHash()){
                foreach($_SESSION as $sessionKey => $sessionValue){
                    self::$sessionsArr[$sessionKey] = $sessionValue;
                }
                return true;
            }else{
                return false;
            }
           
        }

        public function getUserTypeCookie(){
            if($_SESSION["usertype"]){
                return $_SESSION["usertype"];
            }else{
                return false;
            }
        }

        public function getUserHashCookie(){
            if($_SESSION["userhash"]){
                return $_SESSION["userhash"];
            }else{
                return false;
            }
        }

        public function getArr(){
            return $_SESSION;
        }

        private function verifyIfExistUserHash(){
            //verify if user hash exists
            if($_SESSION["usertype"] == "laundry"){
                $tableName = "laundries";
            }else if($_SESSION["usertype"] == "user"){
                $tableName = "users";
            }
            $userhash = $_SESSION["userhash"]; //since associative arrays can't be inserted on sql queries
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
            mysqli_select_db($conn, $db) or die("Connection Error");
            $sql = "SELECT 1 FROM $tableName WHERE hashcode='$userhash' LIMIT 1";

            $result = mysqli_query($conn, $sql);
            

            return (mysqli_num_rows($result) == 1) ? true: false;
        }
        

    }

?>