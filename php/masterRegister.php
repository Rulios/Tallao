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



if(isset($initials, $inputlaundryName, $inputLocation, $inputName,$inputLastname, $inputEmail, $inputPassword, $inputTargetMarket)){
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
echo "Connected successfully";

mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");

//1st query check if hashcode exists
 
do{

    $hashCode = createRandomCode();

    $sql = "SELECT * FROM users WHERE hashcode= '$hashCode'";

    if(mysqli_query($conn,$sql)){
        $result = mysqli_query($conn, $sql);
    }else{
        echo mysqli_error($conn);
    }
    
} while (mysqli_num_rows($result) > 0);

//subProcess Create a hash code to the password

$inputPassword = hashPassword($inputPassword);

//2st query

 $sql = "INSERT INTO superusers (initials,hashcode,laundryName, location, legalreprName, legalreprLastname, email, password)
VALUES ('$initials','$hashCode','$inputLaundryName', '$inputLocation','$inputName', '$inputLastname', '$inputEmail', '$inputPassword')";

echo $sql;

if(mysqli_query($conn,$sql)){

}else{
    echo mysqli_error($conn);
}

//3rd query

$sql = "INSERT INTO pricechart (hashcode) VALUES ('$hashCode')";

if(mysqli_query($conn,$sql)){

}else{
    echo mysqli_error($conn);
}

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

?>