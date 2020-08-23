<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

if(Classes\Cookies::readCookies()){

    $inputUserHash = Classes\Cookies::getUserHashCookie();
    $userType = Classes\Cookies::getUserTypeCookie();

    $conn = new mysqli($serverName, $userConn, $passwordConn);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    if($userType == "user"){
        $sql = "SELECT id, name, lastname, email FROM users WHERE hashcode= '$inputUserHash'";
    
    }else if ($userType == "laundry"){
        $sql = "SELECT initials,name, location,schedule, serviceOffer, legalReprName, legalReprSurname, email FROM laundries WHERE hashcode= '$inputUserHash'";
        
    }
    
    mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
    $result = mysqli_query($conn, $sql);
    
    if(! $result ) {
        die('Could not get data: ' . mysql_error());
     }  
    
    //echo mysqli_num_rows($result);
    $data = [];
    $data = mysqli_fetch_array($result);
    $data["userType"] = $userType;
    
    echo json_encode($data);
    
    mysqli_close($conn);
}
?>