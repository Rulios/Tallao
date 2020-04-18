<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$userHashCode = "";
$inputServiceOffer = "";

/* $userHashCode = "v9GopsZk5g83aDxJLOTy";
$serviceSelected = "iron";
$inputPriceConfig = "shirt=0.65;skirt=0.65"; */

if(isset($inputServiceOffer, $userHashCode)){
    $userHashCode = $_POST['inputUserHash'];
    $serviceSelected = $_POST['serviceoffer'];
    $inputPriceConfig = $_POST['priceConfig'];
    
}

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



echo "Connected successfully";


mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");

$sql = "UPDATE pricechart SET " . $serviceSelected . "='$inputPriceConfig' WHERE hashcode='$userHashCode'";
echo $sql;


if(mysqli_query($conn,$sql)){

}else{
    echo mysqli_error($conn);
} 

mysqli_close($conn);

?>