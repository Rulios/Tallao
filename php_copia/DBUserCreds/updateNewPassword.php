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


if(Classes\Cookies::readCookies()){

    if(isset($_POST['inputUserHash'], $_POST['inputPassword'], $_POST['userType'])){
        $inputUserHash = Classes\Cookies::getUserHashCookie();
        $userType = Classes\Cookies::getUserTypeCookie();
        $inputPassword = $_POST['inputPassword'];
    }
    
    $conn = new mysqli($serverName, $userConn, $passwordConn);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully";
    
    mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
    
    //subProcess Create a hash code to the password
    $inputPassword = hashPassword($inputPassword);
    
    if($userType == "user"){
        $sql = "UPDATE users SET password='$inputPassword' WHERE hashcode='$inputUserHash'";
    }else if($userType == "superuser"){
        $sql = "UPDATE laundries SET password='$inputPassword' WHERE hashcode='$inputUserHash'";
    
    }
    
    if(!mysqli_query($conn,$sql)){
        echo mysqli_error($conn);
    } 
    
    mysqli_close($conn);
}

function hashPassword($password){
   
    $options = [
        'cost' => 12,
    ];
    return password_hash($password, PASSWORD_BCRYPT, $options);
}

?>