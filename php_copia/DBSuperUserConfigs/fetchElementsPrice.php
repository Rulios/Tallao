<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";


if(Classes\Cookies::readCookies()){
    if (isset($_POST['serviceOffer'])){

        $inputUserHash = Classes\Cookies::getUserHashCookie();
        $serviceSelected = $_POST["serviceOffer"];
    }
        /* $inputUserHash = "8XMqSGzajxRRQiyLZj8m";
    $serviceSelected = "iron"; */
    
    $conn = new mysqli($serverName, $userConn, $passwordConn);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    /*All the services and it's fields that 
    stores a string of prices per element:
    -iron  
    -wash
    -washiron
    -dryclean   */
    
    $sql = "SELECT " . $serviceSelected . ", hook FROM pricechart WHERE laundryInitials='$inputUserHash'";
    
    mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
    $result = mysqli_query($conn, $sql);
    
    if(!$result ) {
        die('Could not get data: ' . mysql_error());
    }  
    
    //echo mysqli_num_rows($result);
    $data = [];
    
    $data = mysqli_fetch_array($result);
    
    if($data[$serviceSelected] == ""){
        $data[$serviceSelected] = "null";
    }
    
    echo json_encode($data);
    
    mysqli_close($conn);
    
}
?>