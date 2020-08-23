<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";
$verify = false;


if(Classes\Cookies::readCookies()){

    if (isset($_POST['inputPassword'])){
        $inputUserHash = Classes\Cookies::getUserHashCookie();
        $userType = Classes\Cookies::getUserTypeCookie();
        $inputPassword = $_POST['inputPassword'];
    }
    print_r($_POST);
    $conn = new mysqli($serverName, $userConn, $passwordConn);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    if($userType == "user"){
        $sql = "SELECT password FROM users WHERE hashcode= '$inputUserHash' LIMIT 1";
    }else if($userType == "laundry"){
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