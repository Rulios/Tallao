<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

$verification = [];

//This is to toggle between the Names of the Cookie and the Table Name on DB
$tableName = "";

if(isset($_POST["inputEmail"], $_POST["inputPassword"], $_POST["userType"])){
    $inputEmail = $_POST['inputEmail'];
    $inputPassword = $_POST['inputPassword'];
    $userType = $_POST["userType"];
}

/* $inputEmail = "wardinpro123@gmail.com";
$inputPassword = "getrekt123";
$userType = "superuser"; */

$tableName = $userType . "s"; //correct to table name

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";

mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");

$sql = "SELECT hashcode, password FROM $tableName WHERE email='$inputEmail' LIMIT 1" ;

$result = mysqli_query($conn, $sql);

$row = mysqli_fetch_array($result);

if (mysqli_num_rows($result) == 1){
   
    $hashUserCode = $row["hashcode"];
    $hashPassword = $row["password"];

    if (password_verify($inputPassword, $hashPassword)){
        //true
        $verification["status"] = "true";
        
        Classes\Cookies::create("usertype", $userType);
        Classes\Cookies::create("userhash", $hashUserCode);
        
        // **PREVENTING SESSION HIJACKING**
        // Prevents javascript XSS attacks aimed to steal the session ID
        ini_set('session.cookie_httponly', 1);

        // **PREVENTING SESSION FIXATION**
        // Session ID cannot be passed through URLs
        ini_set('session.use_only_cookies', 1);

        // Uses a secure connection (HTTPS) if possible
        ini_set('session.cookie_secure', 1);
    } else {
        $verification["status"] = "false";
    }
    
}else{
    //echo "Error en realizar la operación";
    $verification["status"] = "false";
}
echo json_encode($verification);

mysqli_close($conn);
?>