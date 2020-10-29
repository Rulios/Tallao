<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$inputUserHash = "";
$inputPassword = "";


if(Classes\Sessions::readSession()){

    if(isset($_POST['inputPassword'])){
        $inputUserHash = Classes\Sessions::getUserHashCookie();
        $userType = Classes\Sessions::getUserTypeCookie();
        $inputPassword = $_POST['inputPassword'];
    }
    
    $conn = new mysqli($serverName, $userConn, $passwordConn);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        http_response_code(405);
    }
    
    mysqli_select_db($conn, $db) or die("Connection Error");
    
    //subProcess Create a hash code to the password
    $inputPassword = hashPassword($inputPassword);
    
    if($userType == "user"){
        $sql = "UPDATE users SET password='$inputPassword' WHERE hashcode='$inputUserHash'";
    }else if($userType == "laundry"){
        $sql = "UPDATE laundries SET password='$inputPassword' WHERE hashcode='$inputUserHash'";
    
    }
    
    if(!mysqli_query($conn,$sql)){
        http_response_code(400);
        die(mysqli_error($conn));
    } 
    echo "true";
    http_response_code(200);
    mysqli_close($conn);
}

function hashPassword($password){
   
    $options = [
        'cost' => 12,
    ];
    return password_hash($password, PASSWORD_BCRYPT, $options);
}

?>