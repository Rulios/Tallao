<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//fetches schedules
//since the data is stored as JSON, it doesn't need to
//echo json_encode, just echo, and the frontend part will decode it

if(Classes\Cookies::readCookies()){

    $initials = Classes\MinimalCreds::getLaundryInitials(Classes\Cookies::getUserHashCookie());

    $conn = new mysqli($serverName, $userConn, $passwordConn);

    // Check connection
    if ($conn->connect_error) {
        http_response_code(400);
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT serviceOffer FROM laundries WHERE initials= '$initials' LIMIT 1";

    mysqli_select_db($conn, $db) or die("Connection Error");
    $result = mysqli_query($conn, $sql);

    if(!$result ) {
        http_response_code(400);
        die('Could not get data: ' . mysql_error());
    }  
    
    $data = mysqli_fetch_array($result);
  
    http_response_code(200);
    echo $data["serviceOffer"];
    mysqli_close($conn);
}

?>