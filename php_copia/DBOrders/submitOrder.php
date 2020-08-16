<?php

require_once "../includes/autoload.php";

//constant // Can't use define since at SQL string won't know if it's a variable, just plain text
$FIRST_STATUS = "status-wait";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data

//set the constant of the limit
const limit = 10000;

if(Classes\Cookies::readCookies()){
  
    $jsonTest = '{"indications":" Sin pliegue","elementsOnOrder":{"shirt":{"iron":{"quantity":1,"price":0.65}},
    "pants":{"iron":{"quantity":1,"price":0.65}}},"hookQuantity":2,"totalPrice":1.3,"dateTimeAssignedForOrder":"2020-08-15 22:39:00",
    "dateTimeOrderCreated":"2020-08-14 21:34","customerID":"GUQ13","customerName":"Robert Lu Zheng"}';

    $dataObj = json_decode($jsonTest);

    $laundryInitials = Classes\MinimalCreds::getLaundryInitials(Classes\Cookies::getUserHashCookie());
    $customerID = $dataObj->customerID;
    $customerName = $dataObj ->customerName;
 
    $status = "status-wait";
    $elementsDetails = json_encode($dataObj->elementsOnOrder);
    $hookQuantity = $dataObj->hookQuantity;
    $dateCreated = $dataObj->dateTimeOrderCreated;
    $dateAssigned = $dataObj->dateTimeAssignedForOrder;
    $totalPrice = $dataObj->totalPrice;
    $indications = $dataObj->indications;

    Classes\OrderIDHandler::process($laundryInitials);
    $newID = [];
    $newID = Classes\OrderIDHandler::getNewLastOrderID();
    $newIDChar = $newID["char"];
    $newIDNumber = $newID["number"];
    print_r($newID);

    /* if(file_get_contents("php://input")){
        $dataStream = file_get_contents("php://input");
        $dataObj = json_decode($dataStream);
        $dateTimeOrderCreated = $dataObj->elementsOnOrder;
        //print_r($dataObj);
        echo $dateTimeOrderCreated;
    } */

    /*
    $clientID = "GUQ13";
    $clientName = "Robert Lu Zheng";
    $elementQuantityString = "shirt-iron=1,pants-iron=1";
    $elementPriceString = "shirt-iron=1,pants-iron=0.65";
    $hookQuantity = "2";
    $dateReceive = "2020-04-30 23:00";
    $dateAssign = "2020-05-01 23:32";
    $totalPrice = "1.65"; */
    
    $conn = new mysqli($serverName, $userConn, $passwordConn);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
    
    //Get the last receipt id as a reference point, then increment it by one
    //and upgrade it on the superuser db as the last reference point
    
    //If the last receipt id is 10000, the letter upgrades to the next
    //character of the alphabet
    
    //Format A-1541
    
    $sql = "INSERT INTO orders (laundryInitials, customerID, customerName, idChar, idNumber, status,elementsDetails, hookQuantity, 
    dateReceive, dateAssign, totalPrice, indications)
    VALUES ('$laundryInitials','$customerID','$customerName', '$newIDChar','$newIDNumber','$FIRST_STATUS',
    '$elementsDetails' ,'$hookQuantity', '$dateCreated', '$dateAssigned', '$totalPrice', '$indications')
    LIMIT 1";

    if(mysqli_query($conn,$sql)){
        Classes\OrderIDHandler::updateLastOrderID($laundryInitials);

        echo "YEYO!";
        
    }else{
        echo mysqli_error($conn);
    }
    mysqli_close($conn);
}

?>