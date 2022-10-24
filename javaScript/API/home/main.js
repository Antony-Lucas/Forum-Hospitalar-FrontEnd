import { eraseCookie, getCookie} from "../cookie/cookies.js";

let sign_out = document.getElementById("signOut");
var userNameMenu = document.getElementById("myUserName");
var name_user = localStorage.getItem("name_session");
console.log(localStorage.getItem("name_session"));
console.log(localStorage.getItem("management_session"))
window.onload = function(){
    userNameMenu.innerHTML = name_user;
    if(getCookie('usr_tkn') == ""){
        window.location.href = '../../../index.html';
    }
}

sign_out.addEventListener('click', function(){
    eraseCookie('usr_tkn');    
    if(getCookie('usr_tkn') == ""){
        window.location.href = '../../../index.html';
    }
})
