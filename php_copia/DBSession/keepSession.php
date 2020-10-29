<?php //File that validates sessions if exists on DB
      //If exists, it will keep session on frontend

    require_once "../includes/autoload.php";

    //Connection param
    $serverName = "localhost";
    $userConn = "root";
    $passwordConn = "hola1234";
    $db = "tallao";

    if(Classes\Sessions::readSession()){

        //data
        $userHash = Classes\Sessions::getUserHashCookie();
        $userType = Classes\Sessions::getUserTypeCookie();

        $tableName = $userType . "s";

        if($userType == "laundry"){
            $tableName = "laundries";
        }else if($userType == "user"){
            $tableName = "users";
        }

        $conn = new mysqli($serverName, $userConn, $passwordConn);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        mysqli_select_db($conn, $db) or die("Connection Error");

        $sql = "SELECT 1 FROM $tableName WHERE hashcode='$userHash' LIMIT 1";

        $result = mysqli_query($conn, $sql);

        $data = [];
        $data["status"] = (mysqli_num_rows($result) == 1) ? true : false;
    }else{
        $data = [];
        $data["status"] = false;
    }

    echo json_encode($data);

?>