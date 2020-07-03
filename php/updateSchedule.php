<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$userHashCode = "";
$inputServiceOffer = "";



if(isset($_POST['initials'], $_POST['schedule'])){
    $initials = $_POST['initials'];
    $schedule = $_POST['schedule'];
}

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



echo "Connected successfully";


mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");

$sql = "UPDATE superusers SET schedule='$schedule' WHERE initials='$initials'";



if(mysqli_query($conn,$sql)){
    
}else{
    echo mysqli_error($conn);
} 

mysqli_close($conn);

?>