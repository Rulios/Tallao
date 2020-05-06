<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$userHashCode = "";
$inputServiceOffer = "";
/* 
$idMessage = "VICNT1"; */

if(isset($_POST['idMessage'])){
    
    $idMessage = $_POST['idMessage'];
    
}

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";


mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");

$sql = "DELETE FROM custommessages WHERE id='$idMessage'";
echo $sql;


if(mysqli_query($conn,$sql)){

}else{
    echo mysqli_error($conn);
} 

mysqli_close($conn);

?>