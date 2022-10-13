import { eraseCookie, getCookie } from "../cookie/cookies.js";

let sign_out = document.getElementById("signOut");

sign_out.addEventListener('click', function(){
    eraseCookie('usr_tkn');    
    if(getCookie('usr_tkn') == ""){
        window.location.href = '../../../index.html';
    }
})

window.onload = function(){
    if(getCookie('usr_tkn') == ""){
        window.location.href = '../../../index.html';
    }
}