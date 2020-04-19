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
$hour = date('h');

//check cycle
if(date('H') > 12){
    $timeCycle = "PM";
}else{
    $timeCycle = "AM";
}

$data["hour"] = $hour;
$data["cycle"] = $timeCycle;


echo json_encode($data);

?>