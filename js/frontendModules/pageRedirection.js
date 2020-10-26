define([], function(){

    function loginRedirection(url){
        window.location.replace(url);
    }

    function bounceToLogin(){
        window.location.replace("./login.html");
    }

    return{
        loginRedirection: loginRedirection,
        bounceToLogin: bounceToLogin
    };

});