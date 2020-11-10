<?php

ob_start();

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

    if($userType == "laundry"){
        $tableName = "laundries";
    }else if($userType == "user"){
        $tableName = "users";
    }



    $conn = new mysqli($serverName, $userConn, $passwordConn);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    mysqli_select_db($conn, $db) or die("Connection Error");

    $sql = "SELECT hashcode, password FROM $tableName WHERE email='$inputEmail' LIMIT 1" ;

    $result = mysqli_query($conn, $sql);

    $row = mysqli_fetch_array($result);
    if (mysqli_num_rows($result) == 1){
    
        $hashUserCode = $row["hashcode"];
        $hashPassword = $row["password"];

        if (password_verify($inputPassword, $hashPassword)){
            //true
            $verification["status"] = "true";
            $verification["url"] = Classes\URL::loginURL($userType);
            Classes\Sessions::create("usertype", $userType);
            Classes\Sessions::create("userhash", $hashUserCode);
            
        } else {
            $verification["status"] = "false";
        }
    }else{
        //echo "Error en realizar la operación";
        $verification["status"] = "false";
    }
    
    echo json_encode($verification);
    mysqli_close($conn);

}
?>