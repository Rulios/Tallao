<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";


if (isset($_POST['inputClientID'])){

    $inputUserID = $_POST['inputClientID'];
   

} 

//$inputUserID ="GUQ13";
$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



$sql = "SELECT name, lastname FROM users WHERE id='$inputUserID'";

mysqli_select_db($conn, $db) or die("Connection Error");
$result = mysqli_query($conn, $sql);

if(!$result ) {
    die('Could not get data: ' . mysql_error());
 }  


$data = [];

$data = mysqli_fetch_array($result);




echo json_encode($data);

mysqli_close($conn);


?>