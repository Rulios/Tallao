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

/* $inputUserHash = "v9GopsZk5g83aDxJLOTy";
$inputServiceOffer = "wash-iron,wash,dry-clean"; */

if(Classes\Cookies::readCookies()){

    if(isset($_POST["serviceOFfer"])){
        $inputUserHash = Classes\Cookies::getUserHashCookie();
        $inputServiceOffer = $_POST['serviceOffer'];
    }
    
    $conn = new mysqli($serverName, $userConn, $passwordConn);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
    
    $sql = "UPDATE superusers SET serviceOffer='$inputServiceOffer' WHERE hashcode='$inputUserHash'";
    
    if(mysqli_query($conn,$sql)){
    
    }else{
        echo mysqli_error($conn);
    } 
    
    mysqli_close($conn);
}
?>