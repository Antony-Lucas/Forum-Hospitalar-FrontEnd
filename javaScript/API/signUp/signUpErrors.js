export var user = document.getElementById('newUser');
export var email = document.getElementById('newEmail');
export var pass = document.getElementById('newPassword');
export var submit = document.getElementById('newMySubmit');

var error_empty_field = document.getElementById('error_empty_field');
var load_circle = document.getElementById('loader');

submit.onclick = function(){
    if(user.value.length == 0 || email.value.length == 0 || pass.value.length == 0){
        error_empty_field.style.visibility = "visible";
        return false;
    }else{
        load_circle.style.visibility = 'visible'
        return false;
    }
}