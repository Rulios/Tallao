<?php

require_once "../includes/autoload.php";

//Connection param
$serverName = "localhost";
$userConn = "root";
$passwordConn = "hola1234";
$db = "tallao";

//Data
$userHashCode = "";
$inputServiceOffer = "";

//$idMessage = "VICNT1"; 

if(Classes\Sessions::readSession()){

    if(isset($_POST['idMessage'])){
        $initials = Classes\MinimalCreds::getLaundryInitials(Classes\Sessions::getUserHash());
        $idMessage = $_POST['idMessage'];
    }
    
    $conn = new mysqli($serverName, $userConn, $passwordConn);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    mysqli_select_db($conn, $db) or die("Connection Error");
    
    //First, check the status. If it tags as blocked, it can't be removed.
    //else, to remove.
    
    $sql = "SELECT status FROM custommessages 
    WHERE id='$idMessage' AND laundryInitials='$initials'";
    
    if(mysqli_query($conn,$sql)){
        $result = mysqli_query($conn,$sql);
    
        $data = [];
        $data = mysqli_fetch_array($result);
    
    
        if($data["status"] != "blocked"){
            
            $sql = "DELETE FROM custommessages WHERE id='$idMessage'";
            
            if($data["status"] == ""){
                $data["status"] = "null";
            }
            if(!mysqli_query($conn,$sql)){
                echo mysqli_error($conn);
            }
        }else{
            //return the data to JS, to prevent it to delete it at HTML
            if($data["status"] == "blocked"){
                $data["status"] = "blocked";
            }
        }
        echo json_encode($data);
    }else{
        echo mysqli_error($conn);
    } 
    mysqli_close($conn);
    
}



?>