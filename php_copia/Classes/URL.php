<?php namespace Classes;

    class URL{

        function loginURL($usertype){
            if($usertype == "superuser"){
                return "./masterpanel.html";
            }else if($usertype == "user"){
                return "./panel.html";
            }
        }

    }

?>