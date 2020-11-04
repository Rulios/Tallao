<?php namespace Classes;
    use \mysqli; //reserving native php namespace

    /* // **PREVENTING SESSION HIJACKING**
    // Prevents javascript XSS attacks aimed to steal the session ID
    ini_set('session.cookie_httponly', 1);

    // **PREVENTING SESSION FIXATION**
    // Session ID cannot be passed through URLs
    ini_set('session.use_only_cookies', 1);

    // Uses a secure connection (HTTPS) if possible
    ini_set('session.cookie_secure', 1); */

    class Sessions{

        /* _DISABLED = 0
        _NONE = 1
        _ACTIVE = 2 */
        function create($name, $value){
            startSession();
            if(!isset($_SESSION[$name])){
                $_SESSION[$name] = $value;
            }
        }

         function destroyAll(){
            startSession();

            $_SESSION = [];
            if (ini_get("session.use_cookies")) { 
                $params = session_get_cookie_params(); 
                setcookie(session_name(), '', time() - 42000, 
                    $params["path"], $params["domain"], 
                    $params["secure"], $params["httponly"] 
                ); 
            } 

            session_destroy();
        }

        public function readSession(){
            startSession();
            if(isset($_SESSION) && !empty($_SESSION) && self::verifyIfExistUserHash()){
                try{
                    foreach($_SESSION as $sessionKey => $sessionValue){
                        $_SESSION[$sessionKey] = $sessionValue;
                    }
                    return true;

                }catch(Exception $e){
                    //prevent from doing the request
                    return false;
                }
            }else{
                return false;
            }
           
        }

        public function getUserType(){
            startSession();
            if($_SESSION["usertype"]){
                return $_SESSION["usertype"];
            }else{
                return false;
            }
        }

        public function getUserHash(){
            startSession();
            if($_SESSION["userhash"]){
                return $_SESSION["userhash"];
            }else{
                return false;
            }
        }

        public function getArr(){
            startSession();
            return $_SESSION;
        }

        private function verifyIfExistUserHash(){
            //verify if user hash exists
            if(isset($_SESSION["usertype"]) && $_SESSION["usertype"] == "laundry"){
                $tableName = "laundries";
            }else if(isset($_SESSION["usertype"]) && $_SESSION["usertype"] == "user"){
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

    function startSession(){
        if(session_status() == PHP_SESSION_NONE){
            //session has not started
            session_start();
        }
    }

?>