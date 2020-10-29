<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";


if(Classes\Sessions::readSession()){

    $laundryInitials = Classes\MinimalCreds::getLaundryInitials(Classes\Sessions::getUserHashCookie());

        $conn = new mysqli($serverName, $userConn, $passwordConn);
        
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        /*All the services and it's fields that 
        stores a string of prices per element:
        -iron  
        -wash
        -washIron
        -dryClean   */
        
        $sql = "SELECT iron, wash, washIron, dryClean, hook FROM pricechart 
                WHERE laundryInitials='$laundryInitials' 
                LIMIT 1";
        
        mysqli_select_db($conn, $db) or die("Connection Error");
        $result = mysqli_query($conn, $sql);
        
        if(!$result ) {
            http_response_code(404);
            die('Could not get data: ' . mysql_error());
        }  
        
        $data = [];
        $data = mysqli_fetch_array($result);

        http_response_code(200);

        echo json_encode($data);
        
        mysqli_close($conn);
    
}else{
    http_response_code(400);
    die("Error");
}
?>