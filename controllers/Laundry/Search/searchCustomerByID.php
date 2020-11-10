<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

if (isset($_GET['inputCustomerID'])){
    $inputUserID = $_GET['inputCustomerID'];


    //$inputUserID ="GUQ13";
    $conn = new mysqli($serverName, $userConn, $passwordConn);

    // Check connection
    if ($conn->connect_error) {
        http_response_code(400);
        die();
    }

    $sql = "SELECT name, surname FROM users WHERE id='$inputUserID'";

    mysqli_select_db($conn, $db) or die("Connection Error");
    $result = mysqli_query($conn, $sql);

    if(!$result ) {
        http_response_code(400);
        die();
    }  

    $data = [];

    $data = mysqli_fetch_array($result);

    http_response_code(200);
    echo json_encode($data);

    mysqli_close($conn);

}else{
    http_response_code(400);
    die("Error");
}

?>