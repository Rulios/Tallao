<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";
$verify = false;


if(Classes\Cookies::readCookies()){

    if (isset($_POST['inputUserHash'], $_POST['inputPassword'], $_POST['userType'])){
        $inputUserHash = Classes\Cookies::getUserHashCookie();
        $userType = Classes\Cookies::getUserTypeCookie();
        $inputPassword = $_POST['inputPassword'];
    }
    
    $conn = new mysqli($serverName, $userConn, $passwordConn);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    if($userType == "user"){
        $sql = "SELECT password FROM users WHERE hashcode= '$inputUserHash' LIMIT 1";
    }else if($userType == "superuser"){
        $sql = "SELECT password FROM laundries WHERE hashcode= '$inputUserHash' LIMIT 1";
    }
    
    mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
    $result = mysqli_query($conn, $sql);
    
    $row = mysqli_fetch_array($result);
    
    $hashPassword = $row["password"];
    if (password_verify($inputPassword, $hashPassword)){
        $verify = true;
    }else{
        $verify = false;
    }
    
    echo json_encode($verify);
    
    mysqli_close($conn);

}
?>