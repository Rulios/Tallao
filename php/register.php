<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$id = "";
$inputName = "";
$inputLastname = "";
$inputEmail = "";
$inputPassword = "";
$inputTargetMarket = "";

if(isset($id, $inputName,$inputLastname, $inputEmail, $inputPassword, $inputTargetMarket)){
    $id = $_POST['id'];
    $inputName = $_POST['inputName'];
    $inputLastname = $_POST['inputLastname'];
    $inputEmail = $_POST['inputEmail'];
    $inputPassword = $_POST['inputPassword'];
    $inputTargetMarket = $_POST['inputTargetMarket'];
}else{
    echo "no hay ni na'";
}


$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");

//1st query

$sql = "INSERT INTO users (id, name, lastname, email, password)
VALUES ('$id','$inputName', '$inputLastname', '$inputEmail', '$inputPassword')";

if(mysqli_query($conn,$sql)){

}else{
    echo mysqli_error($conn);
}

//2nd query

$sql = "INSERT INTO targetmarket (reason) VALUES ('$inputTargetMarket')";

if(mysqli_query($conn,$sql)){

}else{
    echo mysqli_error($conn);
}


mysqli_close($conn);

?>