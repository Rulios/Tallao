<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Always required values
$id = "";
$laundryInitials = "";

//variables
$arrSET = []; //array to then implode() to convert it a string
$stringSET = ""; //string of the SET SQL query argument

/*These are all the fields that can be updated 
customerName, status, elementsQuantity, elementsPrice,
hookQuantity, dateReceive, dateAssign, totalPrice, indications
*/


if(Classes\Sessions::readSession()){
    $initials = Classes\MinimalCreds::getLaundryInitials(Classes\Sessions::getUserHash());
    
    //since they're required values, they should be there always
    //then unsetting it to get the variables values
    $id = $_POST["id"];
    unset($_POST["id"]);
    foreach ($_POST as $key => $value) {
        if(isset($_POST[$key])){
            array_push($arrSET, "$key='$value'");
        }
    }

    /* array_push($arrSET, "customerName='Robert Lu Zheng'");
    array_push($arrSET, "customerID='GUQ13'");
    $id = "B-56";
    $laundryInitials = "VICNT"; */

    $stringSET = implode(",", $arrSET);

    $conn = new mysqli($serverName, $userConn, $passwordConn);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    mysqli_select_db($conn, $db) or die("Connection Error");

    $sql = "UPDATE orders SET $stringSET WHERE id='$id' AND laundryInitials ='$laundryInitials'";

    if(!mysqli_query($conn,$sql)){
        echo mysqli_error($conn);
    }

    mysqli_close($conn);
}






?>

