<?php namespace Classes;

    class URL{

        function loginURL($usertype){
            if($usertype == "laundry"){
                return "./masterpanel.html";
            }else if($usertype == "user"){
                return "./panel.html";
            }
        }

    }

?>