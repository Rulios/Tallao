<?php

$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";


// set default timezone
date_default_timezone_set('America/New_York'); // CDT

$date = date('d/m/Y');

$data["date"] = $date;

//12 hours format
$hour12 = date('h');
$hour24 = date('H');
//check cycle
if(date('H') > 12){
    $timeCycle = "PM";
}else{
    $timeCycle = "AM";
}

$data["hour12"] = $hour12;
//$data["hour24"] = $hour24;
$data["cycle"] = $timeCycle;


echo json_encode($data);

?>