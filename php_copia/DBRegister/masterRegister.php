<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
/* $initials = "";
$inputLaundryName = "";
$inputLocation = "";
$inputName = "";
$inputLastname = "";
$inputEmail = "";
$inputPassword = ""; */

$initials = $_POST['inputInitials'];
$inputLaundryName = $_POST['inputLaundryName'];
$inputLocation = $_POST['inputLocation'];
$inputName = $_POST['inputName'];
$inputLastname = $_POST['inputLastname'];
$inputEmail = $_POST['inputEmail'];
$inputPassword = $_POST['inputPassword'];
$hashCode = "";

if(isset($_POST["inputInitials"], 
    $_POST["inputLaundryName"], $_POST["inputLocation"], 
    $_POST["inputName"], $_POST["inputLastname"], $_POST["inputEmail"], 
    $_POST["inputPassword"])){
        
    $initials = $_POST['inputInitials'];
    $inputLaundryName = $_POST['inputLaundryName'];
    $inputLocation = $_POST['inputLocation'];
    $inputName = $_POST['inputName'];
    $inputLastname = $_POST['inputLastname'];
    $inputEmail = $_POST['inputEmail'];
    $inputPassword = $_POST['inputPassword'];
    
}else{
    echo "no hay ni na'";
}

$conn = new mysqli($serverName, $userConn, $passwordConn);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");

//1st query check if hashcode exists
do{
    $hashCode = createRandomCode();

    $sql = "SELECT 1 FROM users WHERE hashcode= '$hashCode' LIMIT 1";
    if(mysqli_query($conn,$sql)){
        $result = mysqli_query($conn, $sql);
    }else{
        echo mysqli_error($conn);
    }
} while (mysqli_num_rows($result) == 1);

//subProcess Create a hash code to the password
$inputPassword = hashPassword($inputPassword);

//2st query
 $sql = "INSERT INTO laundries (initials,hashcode,name, location, legalreprName, legalreprLastname, email, password)
VALUES ('$initials','$hashCode','$inputLaundryName', '$inputLocation','$inputName', '$inputLastname', '$inputEmail', '$inputPassword')
LIMIT 1";
if(!mysqli_query($conn,$sql)){
    echo mysqli_error($conn);
}

//3rd query
$sql = "INSERT INTO pricechart (hashcode) VALUES ('$hashCode')";
if(!mysqli_query($conn,$sql)){
    echo mysqli_error($conn);
}

//4th query create first custom message
insertFirstCustomMessage($initials);

mysqli_close($conn);

function createRandomCode($length = 20){
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    
    return $randomString;
}

function hashPassword($password){
   
    $options = [
        'cost' => 12,
    ];
    return password_hash($password, PASSWORD_BCRYPT, $options);
}

function insertFirstCustomMessage($initials){
    //inserts into DB the first custom message to have as a laundry
    $messageID = $initials . "1";
    $colortag = "white";
    $tag = "Sin pliegue / 不折";
    $message = "Sin pliege / 不折";
    $status = "blocked";

    $sql = "INSERT INTO custommessages(laundryInitials, id, colortag, tag, message, status)
    VALUES($initials, $messageID, $colortag, $tag, $message, $status) LIMIT 1";
    if(!mysqli_query($conn,$sql)){
        echo mysqli_error($conn);
    }
}

?>