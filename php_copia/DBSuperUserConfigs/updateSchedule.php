<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

if(Classes\Cookies::readCookies()){
  
    if(file_get_contents("php://input")){
        $schedule = file_get_contents("php://input");
        $initials = Classes\MinimalCreds::getLaundryInitials(Classes\Cookies::getUserHashCookie());

        if(!strlen($schedule)){
            http_response_code(400); //set error
            die("Error, no schedule sent");
        }   

        $conn = new mysqli($serverName, $userConn, $passwordConn);
    
        // Check connection
        if ($conn->connect_error) {
            http_response_code(400);
            die("Connection failed: " . $conn->connect_error);
        }
        mysqli_select_db($conn, $db) or die("Connection Error");
        
        $sql = "UPDATE laundries SET schedule='$schedule' WHERE initials='$initials'";
        
        if(mysqli_query($conn,$sql)){
            echo "OK";
            http_response_code(200);
        }else{
            http_response_code(400);
            die(mysqli_error($conn));
        }

        mysqli_close($conn);
    }

}
?>