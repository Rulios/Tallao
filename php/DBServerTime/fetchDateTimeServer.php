<?php

$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";


// set default timezone
date_default_timezone_set('America/Panama'); // CDT

$date = date('Y-m-d');

$data["date"] = $date;

//12 hours format
$hour12 = date('h');
$hour24 = date('H');
$minutes = date("i");
$timeCycle = date("a");


$data["hour12"] = $hour12;
$data["hour24"] = $hour24;
$data["cycle"] = $timeCycle;
$data["minutes"] = $minutes;


echo json_encode($data);

?>