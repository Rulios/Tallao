<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

if(Classes\Sessions::readSession()){

    if(isset($_POST['serviceOffer'],$_POST['elementsPrice'], $_POST["hookPrice"])){

        $laundryInitials = Classes\MinimalCreds::getLaundryInitials(Classes\Sessions::getUserHashCookie());
        $serviceSelected = $_POST['serviceOffer'];
        $elementsPriceJSON = $_POST['elementsPrice'];
        $hookPrice = $_POST["hookPrice"];
        
        $priceOBJ = json_decode($elementsPriceJSON);
        if(!count(get_object_vars($priceOBJ))){
            http_response_code(400); //set error
            die("Error no elements price sent");
        }

        $conn = new mysqli($serverName, $userConn, $passwordConn);
    
        // Check connection
        if ($conn->connect_error) {
            http_response_code(400); //set error
            die("Connection failed: " . $conn->connect_error);
        }
        
        mysqli_select_db($conn, $db) or die("Connection Error");
        $sql = "UPDATE pricechart SET " . $serviceSelected . "='$elementsPriceJSON', hook='$hookPrice' WHERE laundryInitials='$laundryInitials'";
        if(mysqli_query($conn,$sql)){
            echo "OK";
            http_response_code(200);
        }else{
            http_response_code(400);
            die(mysqli_error($conn));
        }
        
        mysqli_close($conn);
    }
    
    //ERROR FOR TOMORRO
    //SINCE JSON FIELDS DOESN'T ACCEPTS NULL OR UNDEFINED VALUES
    //CONVERT UNDEFINED A NULL VALUES TO ACCEPTED FORMAATS

}
?>