<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//show total quantity of elements

$conn = new mysqli($serverName, $userConn, $passwordConn);
    
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT elementsDetails FROM orders WHERE laundryInitials='VICNT'";

mysqli_select_db($conn, $db) or die("Connection Error");
$result = mysqli_query($conn, $sql);

$data = [];
    //$data = mysqli_fetch_array($result);
    
while ($row = mysqli_fetch_array($result)) {
    # code...
        $data[] = $row;
        //print_r($row);

        
        //echo "<br>";
}

$sumQ = 0;

foreach($data as $obj){
    $temp = json_decode($obj["elementsDetails"]);
    //print_r($temp);
    //$sumQ += $temp.$quantity;
    //print_r(get_object_vars($temp));
    //print_r();
    $sumQ += $temp->shirt->iron->quantity;
    //echo "<br>";
}
echo $sumQ;

mysqli_close($conn);

?>