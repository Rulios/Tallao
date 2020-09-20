<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//this file advances to the next status of the order
//the status are (written in the correct order, one after another):
// wait, processing, ready

define("STATUS_LIST", [
    "wait", "processing", "ready"
]);


if(Classes\Cookies::readCookies()){

    $orderIDJSONPUT = file_get_contents("php://input");
 

    if(isset($orderIDJSONPUT)){

        try{
            $laundryInitials = Classes\MinimalCreds::getLaundryInitials(Classes\Cookies::getUserHashCookie());
            $orderID = json_decode($orderIDJSONPUT, false);

            $conn = new mysqli($serverName, $userConn, $passwordConn);

            // Check connection
            if ($conn->connect_error) {
                throw new Exception ("Error");
            }
            
            $sql = "SELECT status FROM orders 
                    WHERE laundryInitials='$laundryInitials' 
                    AND idChar='$orderID->idChar' 
                    AND idNumber='$orderID->idNumber' LIMIT 1";
            

            if(!mysqli_select_db($conn, $db)){
                throw new Exception ("Error");
            }
            $result = mysqli_query($conn, $sql);
            
            if(!$result ) {
                throw new Exception ("Error");
            }  
            
            $data = [];
            $data = mysqli_fetch_array($result);

            $statusIndex = array_search($data["status"], STATUS_LIST);

            if($statusIndex != count(STATUS_LIST) -1){
                $newStatus = STATUS_LIST[$statusIndex+1];

                $sql = "UPDATE orders SET status ='$newStatus' 
                WHERE laundryInitials='$laundryInitials' 
                AND idChar='$orderID->idChar' 
                AND idNumber='$orderID->idNumber' LIMIT 1";

                
                if(!mysqli_query($conn,$sql)){
                    throw new Exception ("Error");
                }
            }

            http_response_code(200);
            echo "OK";
            
            mysqli_close($conn);
        }catch(Exception $e){
            http_response_code(400);
            die();
        }

        
    }else{
        http_response_code(400);
        die("Error");
    }
}
?>