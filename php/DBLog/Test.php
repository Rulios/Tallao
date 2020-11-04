<?php 

    include "../includes/autoload.php";

    $hashUserCode = "adwdadwwvce";

    $cookieUserType = new Classes\Sessions("usertype", $hashUserCode);
    $cookieUserType->setOnCookies();

    $cookieUserHash = new Classes\Sessions("userhash", $hashUserCode);
    $cookieUserHash->setOnCookies();



    echo Classes\Sessions::hello();

?>