<?php namespace Classes;

    class URL{

        function loginURL($usertype){
            if($usertype == "laundry"){
                return "./laundrypanel.html";
            }else if($usertype == "user"){
                return "./userpanel.html";
            }
        }

    }

?>