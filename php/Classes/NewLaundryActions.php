<?php namespace Classes;

    use \mysqli;

    //Class that verifies, checks and returns minimal credentials
    //as key values for fetching issues

    //Every input this will take will be from cookies
    class NewLaundryActions{

        public static function setInitialPriceChart($laundryInitials){
             //Connection param
             $serverName = "localhost";
             $userConn = "root";
             $passwordConn = "hola1234";
             $db = "tallao";
 
             $conn = new mysqli($serverName, $userConn, $passwordConn);
 
             // Check connection
             if ($conn->connect_error) {
                 http_response_code(404);
                 die("Connection failed: " . $conn->connect_error);
             }
             mysqli_select_db($conn, $db) or die("Connection Error");

             $sql = "INSERT INTO pricechart (laundryInitials, iron, washIron, wash, dryClean, hook)
                    VALUES ('$laundryInitials', '{}', '{}', '{}', '{}', '0') LIMIT 1";
 
             if(!mysqli_query($conn, $sql)){
                http_response_code(400);
                die($conn->error);
             }
             mysqli_close($conn);
             echo "Setted initial price chart";
        }

        public static function createHashCode4Laundry(){
            //Connection param
            $serverName = "localhost";
            $userConn = "root";
            $passwordConn = "hola1234";
            $db = "tallao";
            $conn = new mysqli($serverName, $userConn, $passwordConn);
            if ($conn->connect_error) {
                http_response_code(404);
                die("Connection failed: " . $conn->connect_error);
            }
            
            mysqli_select_db($conn, $db) or die("Connection Error");

            do{
                $hashCode = createRandomCode();

                $sql = "SELECT 1 FROM (
                    SELECT hashcode AS hashcode from laundries
                    UNION ALL
                    SELECT hashcode FROM users
                )a WHERE hashcode = '$hashCode' LIMIT 1;";

                if($result = mysqli_query($conn, $sql)){
                    
                }else{
                    http_response_code(400);
                    //die(mysqli_error($conn));
                    die("Cannot create hashcode for laundry");
                }
            } while (mysqli_num_rows($result) == 1);
            
            return $hashCode;
        }

        public static function insertFirstCustomMessage($laundryInitials){
            //inserts into DB the first custom message to have as a laundry

            //Connection param
            $serverName = "localhost";
            $userConn = "root";
            $passwordConn = "hola1234";
            $db = "tallao";
            $conn = new mysqli($serverName, $userConn, $passwordConn);
            if ($conn->connect_error) {
                http_response_code(404);
                die("Connection failed: " . $conn->connect_error);
            }
            
            mysqli_select_db($conn, $db) or die("Connection Error");

            $messageID = $laundryInitials . "1";
            $colortag = "white";
            $tag = "Sin pliegue / 不折";
            $message = "Sin pliege / 不折";
            $status = "blocked";
            
            $message1 = array(
                "messageID" => uniqid("", true),
                "colorTag" => "white",
                "tag" => "Sin pliegue / 不折",
                "message" => "Sin pliegue / 不折",
                "status" => "blocked"
            );
        
            $message2 = array(
                "messageID" => uniqid("", true),
                "colorTag" => "white",
                "tag" => "Sin pliegue / 不折",
                "message" => "Sin pliegue / 不折",
                "status" => "blocked"
            );
        
            /* $sql = "INSERT INTO custommessages(laundryInitials, id, colortag, tag, message, status)
            VALUES
            ('$laundryInitials', '$message1[messageID]', '$message1[colorTag]', '$message1[tag]', '$message1[message]', '$message1[status]') ,
            ('$laundryInitials', '$message2[messageID]', '$message2[colorTag]', '$message2[tag]', '$message2[message]', '$message2[status]') 
            LIMIT 2"; */

            $sql = "INSERT INTO custommessages(laundryInitials, id, colortag, tag, message, status)
            VALUES
            ('$laundryInitials', '$message1[messageID]', '$message1[colorTag]', '$message1[tag]', '$message1[message]', '$message1[status]') 
            LIMIT 1";
        
            if(!mysqli_query($conn,$sql)){
                http_response_code(400);
                die(mysqli_error($conn));
            }
        }

        public static function createLastOrderID($laundryInitials){
            //Connection param
            $serverName = "localhost";
            $userConn = "root";
            $passwordConn = "hola1234";
            $db = "tallao";
            $conn = new mysqli($serverName, $userConn, $passwordConn);
            if ($conn->connect_error) {
                http_response_code(404);
                die("Connection failed: " . $conn->connect_error);
            }
            
            mysqli_select_db($conn, $db) or die("Connection Error");

            $sql = "INSERT INTO lastorderid (laundryInitials, idChar, idNumber)
            VALUES ('$laundryInitials', 'A', '0')";

            if(!mysqli_query($conn,$sql)){
                http_response_code(400);
                die(mysqli_error($conn));
            }
        }

    }

    function createRandomCode($length = 20){
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

?>

