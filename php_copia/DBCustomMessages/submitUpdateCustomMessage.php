<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

if(Classes\Cookies::readCookies()){


    if(isset($_POST['messageObj'])){
        $initials = Classes\MinimalCreds::getLaundryInitials(Classes\Cookies::getUserHashCookie());
    
        //associative array
        $messageAssArr = json_decode($_POST["messageObj"], true);
        /* $initials = "VICNT";
        $jsonString = '{"VICNT1":{"msgTagName":"Buenos día","msgColor":"#7FE5FF","msgText":"Buenos díaas!"},"VICNT2":{"msgTagName":"grtgrty","msgColor":"#87E8C1","msgText":"rtyrtyrt"}}';
        $messageAssArr = json_decode($jsonString,true); */
        $conn = new mysqli($serverName, $userConn, $passwordConn);
        
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        mysqli_select_db($conn, $db) or die("Connection Error");
        
            //iterate for each element, then see if it exists at the DB
            //IF IT EXISTS: do a UPDATE statement to the fields
            //IT DOESNT EXISTS: do a INSERT statement to new rows


        try {
            foreach($messageAssArr as $x => $x_value) {
                //$x is the key
                //$x_value is a associative array
                
                $colorTag = $x_value["colorTag"];
                $tagName = $x_value["tag"];
                $msgText = $x_value["message"];
                //$status = $x_value["status"];
    
                $sql = "SELECT id FROM custommessages WHERE id='$x'";
    
                if(mysqli_query($conn,$sql)){
                    $result = mysqli_query($conn, $sql);
                    $data = [];
                    $data = mysqli_fetch_array($result);
                    
                    if($data["id"] == ""){ //doesn't exists the id
                        //INSERT statement
    
                        $sql = "INSERT INTO custommessages (laundryInitials, id, colortag, tag, message) VALUES ('$initials','$x','$colorTag', '$tagName','$msgText')";
    
                        if(!mysqli_query($conn,$sql)){
                            http_response_code(400);
                            die("Error insertion");
                        }  
    
                    }else{//exists in the DB
                        //UPDATE statement
    
                        $sql = "UPDATE custommessages SET colortag='$colorTag', tag='$tagName', message='$msgText' WHERE id='$x'";
    
                        if(!mysqli_query($conn,$sql)){
                            http_response_code(400);
                            die("Error update");
                        }  
                    }
                }else{
                    die("bad parsing");
                } 
            }
        }catch (Exception $e){
            http_response_code(400);
            die($e);
        }
    }
    
    http_response_code(200);
    echo "OK";
    mysqli_close($conn);
}

?>