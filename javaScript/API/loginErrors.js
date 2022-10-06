var user = document.getElementById('username');
var pass = document.getElementById('password');
var submit = document.getElementById('mySubmit');

var error_empty_field = document.getElementById('error_empty_field');
var load_circle = document.getElementById('loader');

submit.onclick = function(){
    if(user.value.length == 0 || pass.value.length == 0){
        error_empty_field.style.visibility = "visible";
        return false;
    }else{
        load_circle.style.visibility = 'visible'
        return false;
    }
}