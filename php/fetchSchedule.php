<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";


if (isset($_POST['inputInitials'])){

    $inputInitials = $_POST["inputInitials"];

} 


$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT schedule FROM superusers WHERE initials= '$inputInitials'";

mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
$result = mysqli_query($conn, $sql);

if(!$result ) {
    die('Could not get data: ' . mysql_error());
 }  

//echo mysqli_num_rows($result);
$data = [];
$data = mysqli_fetch_array($result);


if($data["schedule"] == ""){
    $data["schedule"] = "null";
    
}

echo json_encode($data);

mysqli_close($conn);


?>