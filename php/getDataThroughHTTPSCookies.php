<?php

//This code applies for all the HTTP requests to the DB
//that needs UserHash or UserType as parameters to fetch

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

$data = [];
$data = session_get_cookie_params();

print_r($_COOKIE);
//since all the cookies that we have created on login have HTTPOnly
//document.cookie will be erased. So no external user can input cookies or modify it.
if($_COOKIE > 0){   
    $userType = $_COOKIE["usertype"];
    $userHash = $_COOKIE["userhash"];

    $tableName = ($userType == "user") ? "users" : "superusers"; //correct to table name
}else{

}


function allowSession($userHash, $tableName){
    //validate data fields to allow instant session
    $sql = "SELECT * FROM $tableName WHERE hashcode='$userHash'";

    if (mysqli_num_rows($result) == 1){
        //enables the enter
        return array("validation"=>"true");
    }else{
        //disables the session
        return array("validation"=>"false");
    }
}

function fetchMyAccountData($userType, $userHash){

    if($userType == "user"){
        $sql = "SELECT id, name, lastname, email FROM users WHERE hashcode= '$userHash'";
    
    }else if ($userType == "superuser"){
        $sql = "SELECT initials,laundryName, location,schedule, serviceOffer, legalreprName, legalreprLastname, email FROM superusers WHERE hashcode= '$userHash'";
        
    }

    $result = mysqli_query($conn, $sql);

    if(! $result ) {
        die('Could not get data: ' . mysql_error());
    }    

    //echo mysqli_num_rows($result);
    $data = [];
    $data = mysqli_fetch_array($result);
    
    return $data;
}


?>

