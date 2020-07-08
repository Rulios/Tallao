<?php

require_once "../includes/autoload.php";

//check if has session available
if(Classes\Cookies::readCookies()){
    //Connection param
    $serverName = "localhost";
    $userConn = "root";
    $passwordConn = "hola1234";
    $db = "tallao";

    if (isset($_POST["inputEmail"])){
        $inputEmail = $_POST["inputEmail"];
    }
    /* $inputEmail = "robert_lu20@hotmail.com";
    $userType = "superuser"; */

    
    //correct the usertype tag and the Table name
    $userType = Classes\Cookies::getUserTypeCookie();
    $tableName = $userType . "s";

    $conn = new mysqli($serverName, $userConn, $passwordConn);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT email FROM $tableName WHERE email= '$inputEmail' ";

    mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
    $result = mysqli_query($conn, $sql);

    //echo mysqli_num_rows($result);

    $returnData = [];

    if (mysqli_num_rows($result) > 0){
        $returnData['length'] = "1";
    }else{
        $returnData['length'] = "0";
    }

    echo json_encode($returnData);

    mysqli_close($conn);
}



?>