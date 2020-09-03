<?php

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data



if(isset($_POST['initials'],$_POST['messageObj'])){
    
    $inputInitials = $_POST['initials'];

    //associative array
    $messageAssArr = json_decode($_POST["messageObj"], true);
   
}

/* $inputInitials = "VICNT";
$jsonString = '{"VICNT1":{"msgTagName":"Buenos día","msgColor":"#7FE5FF","msgText":"Buenos díaas!"},"VICNT2":{"msgTagName":"grtgrty","msgColor":"#87E8C1","msgText":"rtyrtyrt"}}';
$messageAssArr = json_decode($jsonString,true); */

    

$conn = new mysqli($serverName, $userConn, $passwordConn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

mysqli_select_db($conn, $db) or die("Connection Error");


    //iterate for each element, then see if it exists at the DB
    //IF IT EXISTS: do a UPDATE statement to the fields
    //IT DOESNT EXISTS: do a INSERT statement to new rows

    foreach($messageAssArr as $x => $x_value) {
        //$x is the key
        //$x_value is a associative array

        $colorTag = $x_value["msgColor"];
        $tagName = $x_value["msgTagName"];
        $msgText = $x_value["msgText"];
        $status = $x_value["status"];

        $sql = "SELECT id FROM custommessages WHERE id='$x'";

        if(mysqli_query($conn,$sql)){
            $result = mysqli_query($conn, $sql);
            $data = [];
            $data = mysqli_fetch_array($result);
            
            if($data["id"] == ""){ //doesn't exists the id
                //INSERT statement

                $sql = "INSERT INTO custommessages (laundryInitials, id, colortag, tag, message, status) VALUES ('$inputInitials','$x','$colorTag', '$tagName','$msgText', '$status')";

                if(mysqli_query($conn,$sql)){
                    echo "Insertado";
                }else{
                    echo mysqli_error($conn);
                }    

            }else{//exists in the DB
                //UPDATE statement

                $sql = "UPDATE custommessages SET colortag='$colorTag', tag='$tagName', message='$msgText' WHERE id='$x'";

                if(mysqli_query($conn,$sql)){
                    echo "Actualizado";
                }else{
                    echo mysqli_error($conn);
                }  

            }
        
        }else{
            echo mysqli_error($conn);
        } 

    }



mysqli_close($conn);


?>