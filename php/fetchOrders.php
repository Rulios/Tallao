<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

$endHour = "23:59:59";

//SELECT * FROM orders WHERE dateAssign BETWEEN '2020-05-29 15:00:00' AND '2020-05-29 23:59:59' ORDER BY dateAssign ASC LIMIT 0,10

if (isset($_POST['userType'], $_POST['initials'], $_POST['filterMode'], $_POST['params'], $_POST['startIndex'], $_POST['status'])){

    $userType = $_POST['userType'];
    $initials = $_POST['initials'];
    $filterMode = $_POST['filterMode'];
    $params = $_POST['params'];
    $startIndex = $_POST['startIndex'];
    $status = $_POST['status'];

}

//test with date-assign mode
/* $filterMode = "date-assign";
$params = "2020-05-29 15:00:00";
$startIndex = 0;
$userType = "superuser";
$status = "status-wait"; */

//test with date-receive mode
/* $filterMode = "date-receive";
$params = "2020-05-24 15:00:00";
$startIndex = 0;
$userType = "superuser";
$status = "status-wait"; */

//test with date-range mode
/* $filterMode = "date-range";
$params = "2020-05-24 15:00:00 / 2020-06-06 23:59:59";
$startIndex = 2;
$userType = "superuser";
$status = "status-wait"; */

/* //test with order-id mode
$filterMode = "order-id";
$params = "B-47";
$startIndex = 1;
$userType = "superuser";
$status = "status-wait"; */

//test with customer-id mode
/* $filterMode = "customer-id";
$params = "GUQ13";
$startIndex = 1;
$userType = "superuser";
$status = "status-wait"; */


$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if($userType == "user"){
    //$sql = "SELECT id, name, lastname, email FROM users WHERE hashcode= '$inputUserHash'";

}else if ($userType == "superuser"){

    switch($filterMode){
        case "date-assign":
            
            $endDate = getDateFromSingleDateTime($params)." ".$endHour ;

            if($status == 'status-all'){
                $sql = "SELECT * FROM orders WHERE dateAssign BETWEEN '$params' AND '$endDate' ORDER BY dateAssign ASC LIMIT ".$startIndex.",10";
            }else{
                $sql = "SELECT * FROM orders WHERE status='$status' AND dateAssign BETWEEN '$params' AND '$endDate' ORDER BY dateAssign ASC LIMIT ".$startIndex.",10";
            }
            
        break;    
        case "date-receive":
            
            $endDate = getDateFromSingleDateTime($params)." ".$endHour ;

            if($status == 'status-all'){
                $sql = "SELECT * FROM orders WHERE dateReceive BETWEEN '$params' AND '$endDate' ORDER BY dateReceive ASC LIMIT ".$startIndex.",10";
            }else{
                $sql = "SELECT * FROM orders WHERE status='$status' AND dateReceive BETWEEN '$params' AND '$endDate' ORDER BY dateReceive ASC LIMIT ".$startIndex.",10";
            }

            
        break;

        case "date-range":

            $dateArr = [];
            $dateArr = getDateFromRangeDateTime($params);

            if($status == "status-all"){
                $sql = "SELECT * FROM orders WHERE dateAssign BETWEEN '$dateArr[0]' AND '$dateArr[1]' ORDER BY dateAssign ASC LIMIT ".$startIndex.",10";
            }else{
                $sql = "SELECT * FROM orders WHERE status='$status' AND dateAssign BETWEEN '$dateArr[0]' AND '$dateArr[1]' ORDER BY dateAssign ASC LIMIT ".$startIndex.",10";
            }
            
        break;

        case "order-id":
            
            //this will not have a $status parameter
            $sql = "SELECT * FROM orders WHERE id='$params'";

        break;
        
        case "customer-id":
            $sql = "SELECT * FROM orders WHERE customerID='$params' ORDER BY dateAssign ASC LIMIT ".$startIndex.",10";
        break;    
    }    

}

mysqli_select_db($conn, $db) or die("Connection Error");
$result = mysqli_query($conn, $sql);

if(! $result ) {
    die('Could not get data: ' . mysql_error());
 }  

$data = [];
//$data = mysqli_fetch_array($result);

while ($row = mysqli_fetch_array($result)) {

	# code...
	 $data[] = $row;
}
echo json_encode($data);
mysqli_close($conn);


function getDateFromSingleDateTime($str){
    //format "date hour"
    //returns the date
    $arr = [];
    $arr = explode(" ", $str);
   
    return $arr[0];

}

function getDateFromRangeDateTime($str){
    //should return a 2 elements array

    $arr = [];
    $arr = explode("/", $str);

    return $arr;
}


?>