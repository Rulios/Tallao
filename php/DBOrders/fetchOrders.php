<?php

require_once "../includes/autoload.php";


if(Classes\Sessions::readSession()){
    

    //Connection param
    $serverName = "localhost";
    $userConn = "root";
    $passwordConn = "hola1234";
    $db = "tallao";


    if (isset($_GET['paramSelected'], $_GET['params'], $_GET['elementsToFetch'], $_GET['status'])){
        $userType = Classes\Sessions::getUserType();
        $initials = Classes\MinimalCreds::getLaundryInitials(Classes\Sessions::getUserHash());
        

        $paramSelected = $_GET['paramSelected'];
        $params = json_decode($_GET['params']);
        $elementsToFetch = $_GET['elementsToFetch'];
        $status = $_GET['status'];
        //parameters
        
        $dateParam = $params->dateInput;
        $hourParam = $params->hourInput;
        $orderParam = $params->orderInput;

        $conn = new mysqli($serverName, $userConn, $passwordConn);
        // Check connection
        if ($conn->connect_error) {
            http_response_code(400);
            die("Connection failed: " . $conn->connect_error);
        }
        
        if($userType == "user"){

            

        }else if ($userType == "laundry"){
        
            switch($paramSelected){
                case "dateAssign":
                    $endDateTime = "$dateParam->endDate  $hourParam->endHour";
                    if($status == "all"){
                        $sql = "SELECT * FROM orders 
                            WHERE laundryInitials = '$initials' AND dateAssign BETWEEN '$dateParam->endDate 00:00' AND '$endDateTime'
                            ORDER BY dateAssign ASC LIMIT $elementsToFetch";
                    }else{
                        $sql = "SELECT * FROM orders 
                            WHERE laundryInitials = '$initials' AND status='$status' AND dateAssign BETWEEN '$dateParam->endDate 00:00' AND '$endDateTime'
                            ORDER BY dateAssign ASC LIMIT $elementsToFetch";
                    }
                    
                break;    
                case "dateReceive":
                    $endDateTime = "$dateParam->endDate  $hourParam->endHour";
                        if($status == "all"){
                            $sql = "SELECT * FROM orders 
                                WHERE laundryInitials = '$initials' AND dateReceive BETWEEN '$dateParam->endDate 00:00' AND '$endDateTime'
                                ORDER BY dateReceive ASC LIMIT $elementsToFetch";
                        }else{
                            $sql = "SELECT * FROM orders 
                                WHERE laundryInitials = '$initials' AND status='$status' AND dateReceive BETWEEN '$dateParam->endDate 00:00' AND '$endDateTime'
                                ORDER BY dateReceive ASC LIMIT $elementsToFetch";
                        }
                break;
        
                case "dateRange":
                    $startDate = "$dateParam->startDate $hourParam->startHour";
                    $endDate = "$dateParam->endDate $hourParam->endHour";

                    if($status == "all"){
                        $sql = "SELECT * FROM orders 
                                WHERE laundryInitials = '$initials' 
                                AND dateAssign 
                                BETWEEN '$startDate'
                                AND '$endDate' 
                                ORDER BY dateAssign DESC LIMIT $elementsToFetch";
                    }else{
                        $sql = "SELECT * FROM orders 
                                WHERE laundryInitials = '$initials' 
                                AND status='$status' 
                                AND dateAssign 
                                BETWEEN '$startDate' 
                                AND '$endDate' 
                                ORDER BY dateAssign DESC LIMIT $elementsToFetch";
                    }
                break;
        
                case "orderID":
                    
                    $sql = "SELECT * FROM orders 
                            WHERE laundryInitials = '$initials' 
                            AND idChar='$orderParam->char'
                            AND idNumber='$orderParam->number' LIMIT 1";
        
                break;
                
                case "customerID":
                    $sql = "SELECT * FROM orders 
                            WHERE customerID='$params' 
                            ORDER BY dateAssign ASC LIMIT $elementsToFetch";
                break;    
            }    
        
        }
        
        /* echo $sql;
        echo "<br><br>"; */

        mysqli_select_db($conn, $db) or die("Connection Error");
        $result = mysqli_query($conn, $sql);
        
        if(!$result ) {
            http_response_code(404);
            die('Could not get data: ');
        }  
        
        $data = [];
        //$data = mysqli_fetch_array($result);
        
        while ($row = mysqli_fetch_array($result)) {
            $data[] = $row;
       
            /* echo $row["idChar"] . $row["idNumber"];
            echo "<br><br>"; */
        }
        //http_reponse_code(200);
        echo json_encode($data);
        
        mysqli_close($conn);

    }else{
        http_response_code(400);
        die("Bad Request");
    }

}

/* function getDateFromSingleDateTime($str){
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
 */
 /*  $userType = Classes\Sessions::getUserType();
    $initials = Classes\MinimalCreds::getLaundryInitials(Classes\Sessions::getUserHash()); */

    //test with date-assign mode
    /* $paramSelected = "date-assign";
    $params = "2020-05-29 15:00:00";
    $elementsToFetch = 0;
    $status = "status-wait"; */
    
    //test with date-receive mode
    /* $paramSelected = "date-receive";
    $params = "2020-05-24 15:00:00";
    $elementsToFetch = 0;
    $status = "status-wait"; */
    
    //test with date-range mode
    /* $paramSelected = "date-range";
    $params = "2020-05-24 15:00:00 / 2020-06-06 23:59:59";
    $elementsToFetch = 2;
    $status = "status-wait"; */
    
    /* //test with order-id mode
    $paramSelected = "order-id";
    $params = "B-47";
    $elementsToFetch = 1;
    $status = "status-wait"; */
    
    //test with customer-id mode
    /* $paramSelected = "customer-id";
    $params = "GUQ13";
    $elementsToFetch = 1;
    $status = "status-wait"; */

?>