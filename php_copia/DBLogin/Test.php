<?php 

    include "../includes/autoload.php";

    $hashUserCode = "adwdadwwvce";

    $cookieUserType = new Classes\Cookies("usertype", $hashUserCode);
    $cookieUserType->setOnCookies();

    $cookieUserHash = new Classes\Cookies("userhash", $hashUserCode);
    $cookieUserHash->setOnCookies();



    echo Classes\Cookies::hello();

?>