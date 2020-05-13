<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data

//set the constant of the limit
const limit = 10000;

if(isset($_POST['initials'],$_POST['clientID'],$_POST['eQuantity'], $_POST['ePrice'], $_POST['hookQuantity'], $_POST['dateReceived'], $_POST['dateAssigned'], $_POST['totalPrice'], $_POST['indications'])){
    
    $initials = $_POST['initials'];
    $clientID = $_POST['clientID'];
    $elementQuantityString = $_POST['eQuantity'];
    $elementPriceString = $_POST['ePrice'];
    $hookQuantity = $_POST['hookQuantity'];
    $dateReceived = $_POST['dateReceived'];
    $dateAssigned = $_POST['dateAssigned'];
    $totalPrice = $_POST['totalPrice'];
    $indications = $_POST['indications'];
}else{
    echo "no hay ni na'";
}

/* $initials = "VICNT";
$clientID = "GUQ13";
$elementQuantityString = "shirt-iron=1,pants-iron=1";
$elementPriceString = "shirt-iron=1,pants-iron=0.65";
$hookQuantity = "2";
$dateReceived = "2020-04-30 23:00";
$dateAssigned = "2020-05-01 23:32";
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
        $sql = "INSERT INTO orders (laundryinitials, id, elementsQuantity, elementsPrice, hookQuantity, dateReceived, dateAssigned, totalPrice, indications)
        VALUES ('$initials', '$lastRID', '$elementQuantityString', '$elementPriceString', '$hookQuantity', '$dateReceived', '$dateAssigned', '$totalPrice', '$indications')";
        

        if(mysqli_query($conn,$sql)){

            //affiliate the receipt ID to the client side(user table)
            if($clientID != "none"){

                $sql = "SELECT orders FROM users WHERE id='$clientID'";

                if(mysqli_query($conn,$sql)){

                    $result = mysqli_query($conn, $sql);
                    $clientDBorders = [];
                    $clientDBorders = mysqli_fetch_array($result);
                    $str1 = trim($clientDBorders["orders"]);

                    if($str1 != ""){//this fixes the bug of having a , at new data
                        $clientOrders = explode(",", $str1);

                        //add the element to the existing string at the db
                        array_push($clientOrders, $lastRID);
                        $newStrOrders = implode(",", $clientOrders);
                    }else{

                        $newStrOrders = $lastRID;
                    }
                    
                    
                    $sql = "UPDATE users SET orders='$newStrOrders' WHERE id='$clientID'";
                    if(mysqli_query($conn,$sql)){
                    }else{
                        echo mysqli_error($conn);
                    }  

                }else{

                echo mysqli_error($conn);

                }
            
            }
            
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