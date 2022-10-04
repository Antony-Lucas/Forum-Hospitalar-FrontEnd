let user = document.getElementById('username');
let pass = document.getElementById('password');
let submit = document.getElementById('mySubmit');

let error_empty_field = document.getElementById('error_empty_field');
let load_circle = document.getElementById('loader');

submit.onclick = function(){
    if(user.value.length == 0 || pass.value.length == 0){
        error_empty_field.style.visibility = "visible";
        return false;
    }else{
        load_circle.style.visibility = 'visible'
        return false;
    }
}