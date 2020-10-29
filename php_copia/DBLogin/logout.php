<?php
    require_once "../includes/autoload.php";

//check if session exists and destroy it

    Classes\Sessions::destroyAll();

    http_response_code(200);

?>