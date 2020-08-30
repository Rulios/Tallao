<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";


if(Classes\Cookies::readCookies()){
    if (isset($_GET['serviceOffer'])){

        $laundryInitials = Classes\MinimalCreds::getLaundryInitials(Classes\Cookies::getUserHashCookie());
        $serviceSelected = $_GET["serviceOffer"];

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
        
        $sql = "SELECT " . $serviceSelected . ", hook FROM pricechart WHERE laundryInitials='$laundryInitials'";
        
        mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
        $result = mysqli_query($conn, $sql);
        
        if(!$result ) {
            http_response_code(404);
            die('Could not get data: ' . mysql_error());
        }  
        
        $data = [];
        $data = mysqli_fetch_array($result);
        
        if($data[$serviceSelected] == ""){
            $data[$serviceSelected] = "null";
        }
        
        echo json_encode($data);
        
        mysqli_close($conn);
    }
    
    
}
?>