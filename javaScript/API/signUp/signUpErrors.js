export var userName = document.getElementById('newUserNameFull');
export var user = document.getElementById('newUser');
export var email = document.getElementById('newEmail');
export var pass = document.getElementById('newPassword');
export var submit = document.getElementById('newMySubmit');
export var error_auth = document.getElementById('login-error-info');
export var error_empty_field = document.getElementById('error_empty_field');
export var load_circle = document.getElementById('loader');
export var links = document.getElementById('links');
export var signUp_modal = document.getElementById("myModal");
export var button_Login = document.getElementById("butonLogin");

submit.onclick = function(){
    if(userName.value.length == 0 || user.value.length == 0 || email.value.length == 0 || pass.value.length == 0){
        error_empty_field.style.visibility = "visible";
        links.style.top = "35px";
        return false;
    }else{
        load_circle.style.visibility = 'visible'
        return false;
    }
}

button_Login.onclick = function(){
    window.location.href = "../../../index.html";
}