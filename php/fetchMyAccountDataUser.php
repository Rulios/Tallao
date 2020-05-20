<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";



if (isset($_POST['inputUserHash'], $_POST['userType'])){

    $inputUserHash = $_POST["inputUserHash"];
    $userType = $_POST['userType'];

}

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if($userType == "user"){
    $sql = "SELECT id, name, lastname, email FROM users WHERE hashcode= '$inputUserHash'";

}else if ($userType == "superuser"){
    $sql = "SELECT initials,laundryname, location,schedule, serviceoffer, legalreprName, legalreprLastname, email FROM superusers WHERE hashcode= '$inputUserHash'";
    
}

mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
$result = mysqli_query($conn, $sql);

if(! $result ) {
    die('Could not get data: ' . mysql_error());
 }  

//echo mysqli_num_rows($result);
$data = [];
$data = mysqli_fetch_array($result);

echo json_encode($data);

mysqli_close($conn);


?>