<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$userHashCode = "";
$inputServiceOffer = "";


if(Classes\Cookies::readCookies()){

    if(isset($_POST['schedule'])){
        $initials = Classes\MinimalCreds::getLaundryInitials(Classes\Cookies::getUserHashCookie());
        $schedule = $_POST['schedule'];
    }
    
    $conn = new mysqli($serverName, $userConn, $passwordConn);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
    
    $sql = "UPDATE laundries SET schedule='$schedule' WHERE initials='$initials'";
    
    if(!mysqli_query($conn,$sql)){
        echo mysqli_error($conn);
    }
    mysqli_close($conn);
}
?>