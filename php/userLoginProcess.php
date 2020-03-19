<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$inputEmail = "";
$inputPassword = "";
$hashPassword = "";

if(isset($inputEmail, $inputPassword)){
    $inputEmail = $_POST['inputEmail'];
    $inputPassword = $_POST['inputPassword'];
    
}else{
    echo "no hay ni na'";
}

$hashPassword = hashPassword($inputPassword);

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");

$sql = "SELECT hashcode FROM users WHERE email='$inputEmail' AND password='$hashPassword'";



function hashPassword($password){
   
    $options = [
        'cost' => 12,
    ];
    return password_hash($password, PASSWORD_BCRYPT, $options);
}

?>