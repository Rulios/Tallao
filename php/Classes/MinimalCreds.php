<?php namespace Classes;

    use \mysqli;

    //Class that verifies, checks and returns minimal credentials
    //as key values for fetching issues

    //Every input this will take will be from cookies
    class MinimalCreds{

        public static function GetPublicID($userhash){
            
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
            $sql = "SELECT initials 
                    FROM laundries 
                    WHERE hashcode='$userhash' 
                    LIMIT 1";

            $result = mysqli_query($conn, $sql);
            
            $row = mysqli_fetch_assoc($result);
            
            return $row["initials"];
        }

    }


?>