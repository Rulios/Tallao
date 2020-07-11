<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$id = "";
$inputName = "";
$inputLastname = "";
$inputEmail = "";
$inputPassword = "";
$inputTargetMarket = "";
$hashCode = "";

if(isset($_POST["id"], 
    $_POST["inputName"], 
    $_POST["inputLastname"], 
    $_POST["inputEmail"], 
    $_POST["inputPassword"], 
    $_POST["inputTargetMarket"])){
        
    $id = $_POST['id'];
    $inputName = $_POST['inputName'];
    $inputLastname = $_POST['inputLastname'];
    $inputEmail = $_POST['inputEmail'];
    $inputPassword = $_POST['inputPassword'];
    $inputTargetMarket = $_POST['inputTargetMarket'];
}

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");

//1st query check if hashcode exists
 
do{

    $hashCode = createRandomCode();

    $sql = "SELECT 1 FROM users WHERE hashcode= '$hashCode' LIMIT 1";

    if(mysqli_query($conn,$sql)){
        $result = mysqli_query($conn, $sql);
    }else{
        echo mysqli_error($conn);
    }
    
} while (mysqli_num_rows($result) == 1);

//subProcess Create a hash code to the password

$inputPassword = hashPassword($inputPassword);

//2st query

 $sql = "INSERT INTO users (id,hashcode, name, lastname, email, password)
VALUES ('$id','$hashCode','$inputName', '$inputLastname', '$inputEmail', '$inputPassword')";

if(mysqli_query($conn,$sql)){

}else{
    echo mysqli_error($conn);
}

//3nd query

$sql = "INSERT INTO targetmarket (reason) VALUES ('$inputTargetMarket')";

if(!mysqli_query($conn,$sql)){
    echo mysqli_error($conn);
}

mysqli_close($conn);


function createRandomCode($length = 20){
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    
    return $randomString;
}

function hashPassword($password){
   
    $options = [
        'cost' => 12,
    ];
    return password_hash($password, PASSWORD_BCRYPT, $options);
}

?>