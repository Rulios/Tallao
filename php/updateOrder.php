<?php

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


/* if(isset($_POST["id"], $_POST["customerName"], $_POST["status"], $_POST["elementsQuantity"], $_POST["elementsPrice"], $_POST["hookQuantity"], $_POST["dateReceive"], $_POST["dateAssign"], $_POST["totalPrice"], $_POST["indications"])){
  
} */

$id = $_POST["id"];
$laundryInitials = $_POST["initials"];

//since they're required values, they should be there always
//then unsetting it to get the variables values
unset($_POST["id"]);
unset($_POST["initials"]); 

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

//echo "Connected successfully";


mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");

$sql = "UPDATE orders SET $stringSET WHERE id='$id' AND laundryInitials ='$laundryInitials'";
//echo $sql;


if(mysqli_query($conn,$sql)){

}else{
    echo mysqli_error($conn);
} 

mysqli_close($conn);

?>

