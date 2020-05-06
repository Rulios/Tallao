<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";


if (isset($_POST['inputInitials'])){

    $inputInitials = $_POST["inputInitials"];

} 

//$inputInitials = "VICNT";

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, colortag, tag, message FROM custommessages WHERE laundryinitials= '$inputInitials'";

mysqli_select_db($conn, $db) or die("Error al conectarse a la base de datos");
$result = mysqli_query($conn, $sql);

if(!$result ) {
    die('Could not get data: ' . mysql_error());
 }  

//echo mysqli_num_rows($result);
$data = [];
while ($row = mysqli_fetch_array($result)) {

	# code...
	 $data[] = $row;
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

echo json_encode($data);

mysqli_close($conn);


?>