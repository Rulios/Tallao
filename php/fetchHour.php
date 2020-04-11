<?php

$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";


// set default timezone
date_default_timezone_set('America/New_York'); // CDT

$date = date('d/m/Y == H:i:s', time());

echo "Hoy es :" .$date;


echo "<br>";

$hour = date("h", strtotime($date));

echo $hour;



?>