<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";


//Use to update customerID and customerName of the order

if(Classes\Sessions::readSession()){
    $laundryInitials = Classes\MinimalCreds::GetPublicID(Classes\Sessions::getUserHash());
    
    $PUTdataJSON = file_get_contents("php://input");
    $dataOBJ = json_decode($PUTdataJSON);

    $orderID = $dataOBJ->orderID;
    $customerID = $dataOBJ->customerID;
    $customerName = "";

    $conn = new mysqli($serverName, $userConn, $passwordConn);

    // Check connection
    if ($conn->connect_error) {
        http_response_code(400);
        die();
    }

    mysqli_select_db($conn, $db) or die("Connection Error");

    //search for the customerName based on the customerID

    $sql = "SELECT name, surname FROM users WHERE id='$customerID'";
    $result = mysqli_query($conn, $sql);

    if(!$result ) {
        http_response_code(400);
        die();
    }  

    $data = [];
    $data = mysqli_fetch_array($result);
    $customerName = "$data[name] $data[surname]";

    //update customerName
    $sql = "UPDATE orders
            SET customerID ='$customerID', customerName='$customerName'
            WHERE idChar='$orderID->idChar' 
            AND idNumber='$orderID->idNumber' 
            AND laundryInitials ='$laundryInitials'";

    if(!mysqli_query($conn,$sql)){
        http_response_code(400);
        die();
    }

    echo "OK";
    mysqli_close($conn);
}

?>

