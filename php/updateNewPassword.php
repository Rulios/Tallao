<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$userHashCode = "";
$inputPassword = "";


if(isset($_POST['inputUserHash'], $_POST['inputPassword'], $_POST['userType'])){
    $userHashCode = $_POST['inputUserHash'];
    $inputPassword = $_POST['inputPassword'];
    $userType = $_POST['userType'];
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

if($userType == "user"){
    $sql = "UPDATE users SET password='$inputPassword' WHERE hashcode='$userHashCode'";
}else if($userType == "superuser"){
    $sql = "UPDATE laundries SET password='$inputPassword' WHERE hashcode='$userHashCode'";

}



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