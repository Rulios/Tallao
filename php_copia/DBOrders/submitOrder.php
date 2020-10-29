<?php

require_once "../includes/autoload.php";

//constant // Can't use define since at SQL string won't know if it's a variable, just plain text

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data

//set the constant of the limit
const limit = 1000;

if(Classes\Sessions::readSession()){

    /* $jsonTest = '{"indications":" Sin pliegue","elementsOnOrder":{"shirt":{"iron":{"quantity":4,"price":0.65}},
    "pants":{"iron":{"quantity":4,"price":0.65}}},"hookQuantity":2,"totalPrice":1.3,"dateTimeAssignedForOrder":"2020-08-15 22:39:00",
    "dateTimeOrderCreated":"2020-08-14 21:34","customerID":"GUQ13","customerName":"Robert Lu Zheng"}'; */
    //$dataObj = json_decode($jsonTest);

    if(file_get_contents("php://input")){
        $dataStream = file_get_contents("php://input");
        $dataObj = json_decode($dataStream);
        //$dateTimeOrderCreated = $dataObj->elementsOnOrder;

        $laundryInitials = Classes\MinimalCreds::getLaundryInitials(Classes\Sessions::getUserHashCookie());
        $customerID = isset($dataObj->customerID) ? $dataObj->customerID: "";
        $customerName = isset($dataObj ->customerName) ? $dataObj->customerName: "";

        echo $dataObj->customerID;

        //default order status
        $status = "wait";
        //if(isset($dataObj->elementsO))
        if(!count(get_object_vars($dataObj->elementsOnOrder))){
            http_response_code(400); //set error
            die("Error no element selected");
        }
        //print_r($dataObj->elementsOnOrder);
        $elementsDetails = json_encode($dataObj->elementsOnOrder);
        $hookQuantity = isset($dataObj->hookQuantity) ? $dataObj->hookQuantity: 0;
        $dateCreated = isset($dataObj->dateTimeOrderCreated) ? $dataObj->dateTimeOrderCreated: "";
        $dateAssigned = isset($dataObj->dateTimeAssignedForOrder) ? $dataObj->dateTimeAssignedForOrder: "";
        $totalPrice = isset($dataObj->totalPrice) ? $dataObj->totalPrice : 0;
        $indications = isset($dataObj->indications) ? $dataObj->indications: "";

        Classes\OrderIDHandler::process($laundryInitials);
        $newID = [];
        $newID = Classes\OrderIDHandler::getNewLastOrderID();
        $newIDChar = $newID["char"];
        $newIDNumber = $newID["number"];
        
        $conn = new mysqli($serverName, $userConn, $passwordConn);
        
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        mysqli_select_db($conn, $db) or die("Connection Error");

        
        $sql = "INSERT INTO orders (laundryInitials, customerID, customerName, idChar, idNumber, status,elementsDetails, hookQuantity, 
        dateReceive, dateAssign, totalPrice, indications)
        VALUES ('$laundryInitials','$customerID','$customerName', '$newIDChar','$newIDNumber','$status',
        '$elementsDetails' ,'$hookQuantity', '$dateCreated', '$dateAssigned', '$totalPrice', '$indications')
        LIMIT 1";

        if(mysqli_query($conn,$sql)){
            Classes\OrderIDHandler::updateLastOrderID($laundryInitials);
            echo "OK";
            http_response_code(200);
        }else{
            http_response_code(400);
            die(mysqli_error($conn));
        }
        
        mysqli_close($conn);

    }
}

?>