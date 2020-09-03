<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$userHashCode = "";
$inputPassword = "";


if(isset($inputPassword, $userHashCode)){
    $userHashCode = $_POST['inputUserHash'];
    $inputPassword = $_POST['inputPassword'];
    
}

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

mysqli_select_db($conn, $db) or die("Connection Error");


//subProcess Create a hash code to the password

$inputPassword = hashPassword($inputPassword);

$sql = "UPDATE laundries SET password='$inputPassword' WHERE hashcode='$userHashCode'";


if(mysqli_query($conn,$sql)){

}else{
    echo mysqli_error($conn);
} 

mysqli_close($conn);

function hashPassword($password){
   
    $options = [
        'cost' => 12,
    ];
    return password_hash($password, PASSWORD_BCRYPT, $options);
}

?>