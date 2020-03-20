<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$inputEmail = "";
$inputPassword = "";
$hashUserCode = "";
$hashPassword = "";
$verification = [];

//Cookie config
$cookieName = "superuser";
$cookieValues = "";

if(isset($inputEmail, $inputPassword)){
    $inputEmail = $_POST['inputEmail'];
    $inputPassword = $_POST['inputPassword'];
    
}else{
    //echo "no hay ni na'";
}

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";

mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");

$sql = "SELECT hashcode, password FROM superusers WHERE email='$inputEmail'" ;

if(mysqli_query($conn,$sql)){

}else{
    //echo mysqli_error($conn);
} 

$result = mysqli_query($conn, $sql);

$row = mysqli_fetch_array($result);

if (mysqli_num_rows($result) == 1){
   
    $hashUserCode = $row["hashcode"];
    $hashPassword = $row["password"];

    if (password_verify($inputPassword, $hashPassword)){
        //true
        $verification["status"] = "true";
        $cookieValues = $hashUserCode;
        
        setcookie($cookieName, $cookieValues, time()+(1800), "/" );

    } else {
       
        $verification["status"] = "false";
        
    }
    
}else{
    //echo "Error en realizar la operación";
    $verification["status"] = "false";
}

    echo json_encode($verification);

mysqli_close($conn);



?>