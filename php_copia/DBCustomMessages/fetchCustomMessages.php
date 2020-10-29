<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//$initials = "VICNT";

if(Classes\Sessions::readSession()){

	$initials = Classes\MinimalCreds::getLaundryInitials(Classes\Sessions::getUserHashCookie());
	$conn = new mysqli($serverName, $userConn, $passwordConn);
	
	// Check connection
	if ($conn->connect_error) {
		http_response_code(400);
		die("Connection failed: " . $conn->connect_error);
	}
	
	$sql = "SELECT id, colorTag, tag, message FROM custommessages WHERE laundryInitials= '$initials'";
	//echo $sql;
	mysqli_select_db($conn, $db) or die("Connection Error");
	$result = mysqli_query($conn, $sql);
	
	if(!$result ) {
		http_response_code(400);
		die('Could not get data: ' . mysql_error());
	 }  
	
	//echo mysqli_num_rows($result);
	$data = [];
	while ($row = mysqli_fetch_array($result)) {
		 $data[] = $row;
	}
	echo json_encode($data);
	
	mysqli_close($conn);
}



/* //Convert codification
$arrlength = count($data);
$data2 = array();
for ($i=0; $i < $arrlength; $i++) { 

	//the property should be replaced for the Data Type
    $textoTag = $data[$i]["tag"];
    $textoMessage = $data[$i]["message"];

    echo $textoTag . "<br>";
	
	# code...
	$codificacion1 = mb_detect_encoding($textoTag, "UTF-8, ISO-8859-1");
	$codificacion2 = mb_detect_encoding($textoMessage, "UTF-8, ISO-8859-1");
	//echo $texto;
	$textoTag = iconv($codificacion1, 'UTF-8', $textoTag);
	$textoMessage = iconv($codificacion2, 'UTF-8', $textoMessage);
	//$texto = substr($texto, $strLength);

	//echo $texto  ."<br>";
	echo $textoTag . "<br>";
    //array_push($data2, $data[$i]["genre"],$texto);
    $data2[$i]['id'] = $data[$i]["id"];
	$data2[$i]['colortag'] = $data[$i]["colortag"];
    $data2[$i]['tag'] = $textoTag;
    $data2[$i]['message'] = $textoMessage;
	//print_r($data2);
	//$data[] = $texto;
}
//We don't send $data because it contains the unconverted text
//So we use $data2 as an temporal array to store the converted text
echo json_encode($data2); */
?>


