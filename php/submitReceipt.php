<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data

//set the constant of the limit
const limit = 7;

if(isset($_POST['initials'],$_POST['eQuantity'], $_POST['ePrice'], $_POST['hookQuantity'], $_POST['dateReceived'], $_POST['dateAssigned'], $_POST['totalPrice'])){
    
    $initials = $_POST['initials'];
    $elementQuantityString = $_POST['eQuantity'];
    $elementPriceString = $_POST['ePrice'];
    $hookQuantity = $_POST['hookQuantity'];
    $dateReceived = $_POST['dateReceived'];
    $dateAssigned = $_POST['dateAssigned'];
    $totalPrice = $_POST['totalPrice'];
}else{
    echo "no hay ni na'";
}

/* $initials = "VICNT";
$elementQuantityString = "shirt-iron=1,pants-iron=1";
$elementPriceString = "shirt-iron=1,pants-iron=0.65";
$hookQuantity = "2";
$dateReceived = "2020-04-30 23:00";
$dateAssigned = "2020-05-01 23:32";
$totalPrice = "1.65";
 */
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

$sql = "SELECT lastreceiptid FROM superusers WHERE initials = '$initials'";

if(mysqli_query($conn,$sql)){
    $result = mysqli_query($conn,$sql);
    $data = [];
    $data = mysqli_fetch_array($result);

    $lastId = trim($data["lastreceiptid"]); //remove whitespaces
    $arr = [];
    $arr = explode("-", $lastId);//[0] = character, [1] number

    $nextChar = "";
    $nextNumber = 0;
    
    if($arr[1] == limit){
        
        $nextChar = strtolower($arr[0]);
        $nextChar = ++ $nextChar;
        $nextChar = strtoupper($nextChar);
        $nextNumber = 0;
    }else{
        $nextChar = $arr[0];
        $nextNumber = $arr[1] + 1;
    }

    $lastRID = $nextChar. "-" . $nextNumber;

    //update this receipt id as the last receipt id to be the reference
    $sql = "UPDATE superusers SET lastreceiptid = '$lastRID' WHERE initials = '$initials'";
    
    if(mysqli_query($conn,$sql)){
        //continue to the receipt insertion at the database
        $sql = "INSERT INTO orders (laundryinitials, id, elementsQuantity, elementsPrice, hookQuantity, dateReceived, dateAssigned, totalPrice)
        VALUES ('$initials', '$lastRID', '$elementQuantityString', '$elementPriceString', '$hookQuantity', '$dateReceived', '$dateAssigned', '$totalPrice')";
        

        if(mysqli_query($conn,$sql)){
            echo "HECHO";
        }else{
            echo mysqli_error($conn);
        }

    }else{
        echo mysqli_error($conn);
    }

}else{
    echo mysqli_error($conn);
}

mysqli_close($conn);

?>