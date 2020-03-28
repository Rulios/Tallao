<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";


if (isset($_POST['inputUserHash'], $_POST['serviceOffer'])){

    $inputUserHash = $_POST["inputUserHash"];
    $serviceSelected = $_POST["serviceOffer"];

} 

/* $inputUserHash = "8XMqSGzajxRRQiyLZj8m";
$serviceSelected = "iron"; */

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

/* if($serviceSelected == "iron"){
    $sql = "SELECT iron FROM pricechart WHERE hashcode='$inputUserHash'";
}else if($serviceSelected == "wash"){
    $sql = "SELECT wash FROM pricechart WHERE hashcode='$inputUserHash'";
}else if($serviceSelected == "washiron"){
    $sql = "SELECT washiron FROM pricechart WHERE hashcode='$inputUserHash'";
}else if($serviceSelected == "dryclean"){
    $sql = "SELECT dryclean FROM pricechart WHERE hashcode='$inputUserHash'";
} */


$sql = "SELECT " . $serviceSelected . " FROM pricechart WHERE hashcode='$inputUserHash'";

mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
$result = mysqli_query($conn, $sql);

if(!$result ) {
    die('Could not get data: ' . mysql_error());
 }  

//echo mysqli_num_rows($result);
$data = [];

$data = mysqli_fetch_array($result);


if($data[$serviceSelected] == ""){
    $data[$serviceSelected] = "null";
    
}

echo json_encode($data);

mysqli_close($conn);


?>