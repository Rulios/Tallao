<?php
require_once "../includes/autoload.php";
//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

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
    http_response_code(400);
    die("Incomplete information sent");
}

$conn = new mysqli($serverName, $userConn, $passwordConn);
// Check connection
if ($conn->connect_error) {
    http_response_code(404);
    die("Connection failed: " . $conn->connect_error);
}

mysqli_select_db($conn, $db) or die("Connection Error");
// 1 - Create Hashcode
$hashCode = Classes\NewLaundryActions::createHashCode4Laundry();

//subProcess Create a hash code to the password
$inputPassword = hashPassword($inputPassword);

//2 - insert new laundry into DB
 $sql = "INSERT INTO laundries (initials,hashcode,name, location, legalReprName, legalReprSurname, email, password)
VALUES ('$initials','$hashCode','$inputLaundryName', '$inputLocation','$inputName', '$inputLastname', '$inputEmail', '$inputPassword')
LIMIT 1";
if(!mysqli_query($conn,$sql)){
    //die(mysqli_error($conn));
    http_response_code(400);
    die("Can't create laundry");
}

// 3 - insert new row into pricechart with empty json format values
Classes\NewLaundryActions::setInitialPriceChart($initials);

//4th query create first custom message
Classes\NewLaundryActions::insertFirstCustomMessage($initials);

//5 - creates a new row to indicate order id
Classes\NewLaundryActions::createLastOrderID($initials);

mysqli_close($conn);


function hashPassword($password){
    $options = [
        'cost' => 12,
    ];
    return password_hash($password, PASSWORD_BCRYPT, $options);
}


?>