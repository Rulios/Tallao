<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$inputUserHash = "";
$inputServiceOffer = "";

/* $inputUserHash = "8XMqSGzajxRRQiyLZj8m";
$serviceSelected = "iron";
$inputPriceConfig = "shirt=0.65,skirt=0.65";
$inputPriceHook = "0.10"; */

if(Classes\Cookies::readCookies()){

    if(isset($_POST['serviceOffer'],$_POST['priceConfig'],$_POST['priceHook'])){

        $inputUserHash = Classes\Cookies::getUserHashCookie();
        $serviceSelected = $_POST['serviceOffer'];
        $inputPriceConfig = $_POST['priceConfig'];
        $inputPriceHook = $_POST['priceHook'];
        
    }
    
    $conn = new mysqli($serverName, $userConn, $passwordConn);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
    
    $sql = "UPDATE pricechart SET " . $serviceSelected . "='$inputPriceConfig', hook='$inputPriceHook' WHERE hashcode='$inputUserHash'";
    echo $sql;
    
    if(!mysqli_query($conn,$sql)){
        echo mysqli_error($conn);
    }
    
    mysqli_close($conn);

}
?>