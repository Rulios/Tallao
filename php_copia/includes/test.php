<?php 
    require_once "../includes/autoload.php";

    /* //Connection param
    $serverName = "localhost";
    $userConn = "root";
    $passwordConn = "hola1234";
    $db = "tallao";
    $conn = new mysqli($serverName, $userConn, $passwordConn);
    if ($conn->connect_error) {
        http_response_code(404);
        die("Connection failed: " . $conn->connect_error);
    }
    
    mysqli_select_db($conn, $db) or die("Connection Error");

    $d = array("laundryInitials" => "VICNT");

    $sql = "SELECT * FROM lastorderid WHERE laundryInitials ='$d[laundryInitials]'";

    if($result = mysqli_query($conn, $sql)){
        $data = mysqli_fetch_array($result);
        print_r($data);
    }else{
        die(mysqli_error($conn));
    } */

    Classes\NewLaundryActions::insertFirstCustomMessage("DADAI");

?>