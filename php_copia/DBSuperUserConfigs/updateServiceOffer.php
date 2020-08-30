<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//this module will need strict data validation
//since it's not JSON, just mere values separated with commas
//every value should compare will a list
// --pending to do---

if(Classes\Cookies::readCookies()){

    if(isset($_POST["serviceOffer"])){
        $inputUserHash = Classes\Cookies::getUserHashCookie();
        $inputServiceOffer = $_POST['serviceOffer'];

        $conn = new mysqli($serverName, $userConn, $passwordConn);
    
        // Check connection
        if ($conn->connect_error) {
            http_response_code(400);
            die("Connection failed: " . $conn->connect_error);
        }
        mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
        
        $sql = "UPDATE laundries SET serviceOffer='$inputServiceOffer' WHERE hashcode='$inputUserHash'";
        
        if(mysqli_query($conn,$sql)){
            echo "OK";
            http_response_code(200);
        }else{
            http_response_code(400);
            die(mysqli_error($conn));
        } 
    }else{
        http_response_code(400); //set error
        die("Error, no serviceOffer update sent");
    }
    mysqli_close($conn);
}
?>