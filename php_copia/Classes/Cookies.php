<?php namespace Classes;

    use \mysqli; //reserving native php namespace

    class Cookies{

        private static $cookiesArr = [];

        function create($name, $value){
            //this will push forward the cookie creation request
            //$cookiesArr[$name] = $value;
            self::$cookiesArr[$name] = $value;
            setcookie($name, $value, time()+(1000), "/", null, null, true);
            //PHP > 7.3
           /* setcookie($name, $value, [
            'expires' => time()+(1800),
            'path' => "/",
            'domain' => null,
            'samesite' => "Strict",
            'secure' => null,
            'httponly' => true,
            ]); */
        }

        public function readCookies(){
            //since all the cookies that we have created on login have HTTPOnly
            //document.cookie will be erased. So no external user can input cookies or modify it.
            
            if($_COOKIE && self::verifyIfExistUserHash()){
                foreach($_COOKIE as $cookieName => $cookieValue){
                    self::$cookiesArr[$cookieName] = $cookieValue;
                }
                return true;
            }else{
                return false;
            }
           
        }

        public function getUserTypeCookie(){
            if(self::$cookiesArr["usertype"]){
                return self::$cookiesArr["usertype"];
            }else{
                return false;
            }
        }

        public function getUserHashCookie(){
            if(self::$cookiesArr["userhash"]){
                return self::$cookiesArr["userhash"];
            }else{
                return false;
            }
        }

        public function getArr(){
            return self::$cookiesArr;
        }

        private function verifyIfExistUserHash(){
            //verify if user hash exists
            $tableName = $_COOKIE["usertype"] . "s";
            $userhash = $_COOKIE["userhash"]; //since associative arrays can't be inserted on sql queries
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
            $sql = "SELECT 1 FROM $tableName WHERE hashcode='$userhash' LIMIT 1";

            $result = mysqli_query($conn, $sql);
            

            return (mysqli_num_rows($result) == 1) ? true: false;
        }
        

    }

?>