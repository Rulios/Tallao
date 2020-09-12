<?php

require_once "../includes/autoload.php";


if(Classes\Cookies::readCookies()){

    //Connection param
    $serverName = "localhost";
    $userConn = "root";
    $passwordConn = "hola1234";
    $db = "tallao";

    $endHour = "23:59:59";

    if (isset($_GET['filterMode'], $_GET['params'], $_GET['startIndex'], $_GET['status'])){
        $userType = Classes\Cookies::getUserTypeCookie();
        $initials = Classes\MinimalCreds::getLaundryInitials(Classes\Cookies::getUserHashCookie());

        $filterMode = $_GET['filterMode'];
        $params = json_decode($_GET['params']);
        $startIndex = $_GET['startIndex'];
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
            //$sql = "SELECT id, name, lastname, email FROM users WHERE hashcode= '$inputUserHash'";
        }else if ($userType == "laundry"){
        
            switch($filterMode){
                case "dateAssign":
                    $endDateTime = "$dateParam->endDate  $hourParam->endHour";
                    if($status == "all"){
                        $sql = "SELECT * FROM orders 
                            WHERE laundryInitials = '$initials' AND dateAssign BETWEEN '$dateParam->endDate 00:00' AND '$endDateTime'
                            ORDER BY dateAssign ASC LIMIT ".$startIndex.",10;";
                    }else{
                        $sql = "SELECT * FROM orders 
                            WHERE laundryInitials = '$initials' AND status='$status' AND dateAssign BETWEEN '$dateParam->endDate 00:00' AND '$endDateTime'
                            ORDER BY dateAssign ASC LIMIT ".$startIndex.",10;";
                    }
                    
                break;    
                case "dateReceive":
                    $endDateTime = "$dateParam->endDate  $hourParam->endHour";
                        if($status == "all"){
                            $sql = "SELECT * FROM orders 
                                WHERE laundryInitials = '$initials' AND dateReceive BETWEEN '$dateParam->endDate 00:00' AND '$endDateTime'
                                ORDER BY dateReceive ASC LIMIT ".$startIndex.",10;";
                        }else{
                            $sql = "SELECT * FROM orders 
                                WHERE laundryInitials = '$initials' AND status='$status' AND dateReceive BETWEEN '$dateParam->endDate 00:00' AND '$endDateTime'
                                ORDER BY dateReceive ASC LIMIT ".$startIndex.",10;";
                        }
                break;
        
                case "dateRange":
                    $dateArr = [];
                    $dateArr = getDateFromRangeDateTime($params);
                    $startDate = "$dateParam->startDate $hourParam->startHour";
                    $endDate = "$dateParam->endDate $hourParam->endHour";

                    if($status == "all"){
                        $sql = "SELECT * FROM orders 
                                WHERE laundryInitials = '$initials' 
                                AND dateAssign 
                                BETWEEN '$startDate'
                                AND '$endDate' 
                                ORDER BY dateAssign ASC LIMIT ".$startIndex.",10;";
                    }else{
                        $sql = "SELECT * FROM orders 
                                WHERE laundryInitials = '$initials' 
                                AND status='$status' 
                                AND dateAssign 
                                BETWEEN '$startDate' 
                                AND '$endDate' 
                                ORDER BY dateAssign ASC LIMIT ".$startIndex.",10;";
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
                            ORDER BY dateAssign ASC LIMIT ".$startIndex.",10";
                break;    
            }    
        
        }
        
        mysqli_select_db($conn, $db) or die("Connection Error");
        $result = mysqli_query($conn, $sql);
        
        if(!$result ) {
            http_response_code(404);
            die('Could not get data: ');
        }  
        
        $data = [];
        //$data = mysqli_fetch_array($result);
        
        while ($row = mysqli_fetch_array($result)) {
            # code...
            $data[] = $row;
            print_r($row);
            echo "<br>";
            echo "<br>";
        }
        //http_reponse_code(200);
        echo json_encode($data);
        
        mysqli_close($conn);

    }

}

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

 /*  $userType = Classes\Cookies::getUserTypeCookie();
    $initials = Classes\MinimalCreds::getLaundryInitials(Classes\Cookies::getUserHashCookie()); */

    //test with date-assign mode
    /* $filterMode = "date-assign";
    $params = "2020-05-29 15:00:00";
    $startIndex = 0;
    $status = "status-wait"; */
    
    //test with date-receive mode
    /* $filterMode = "date-receive";
    $params = "2020-05-24 15:00:00";
    $startIndex = 0;
    $status = "status-wait"; */
    
    //test with date-range mode
    /* $filterMode = "date-range";
    $params = "2020-05-24 15:00:00 / 2020-06-06 23:59:59";
    $startIndex = 2;
    $status = "status-wait"; */
    
    /* //test with order-id mode
    $filterMode = "order-id";
    $params = "B-47";
    $startIndex = 1;
    $status = "status-wait"; */
    
    //test with customer-id mode
    /* $filterMode = "customer-id";
    $params = "GUQ13";
    $startIndex = 1;
    $status = "status-wait"; */

?>