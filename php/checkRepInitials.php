<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//$inputEmail = "robert_lu20@hotmail.com";

if (isset($_POST['inputInitials'])){

    $inputInitials = $_POST["inputInitials"];

}




$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT initials FROM laundries WHERE initials= '$inputInitials'";



mysqli_select_db($conn, $db) or die("Connection Error");
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

?>