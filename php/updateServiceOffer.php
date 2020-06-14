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
$inputServiceOffer = "wash-iron,wash,dry-clean"; */

if(isset($inputServiceOffer, $userHashCode)){
    $userHashCode = $_POST['inputUserHash'];
    $inputServiceOffer = $_POST['serviceOffer'];
    
}

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");


$sql = "UPDATE superusers SET serviceOffer='$inputServiceOffer' WHERE hashcode='$userHashCode'";


if(mysqli_query($conn,$sql)){

}else{
    echo mysqli_error($conn);
} 

mysqli_close($conn);

?>