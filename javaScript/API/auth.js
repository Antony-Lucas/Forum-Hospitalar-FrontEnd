import { url_api } from "./config.js";
import { getCookie, setCookie } from "./cookie/cookies.js";

let button_submit = document.getElementById('mySubmit')
let user_ = document.getElementById('username');
let pass_ = document.getElementById('password');
var error_auth = document.getElementById('login-error-info');
var error_visible = document.getElementById('error_empty_field');
var load_circle = document.getElementById('loader');
var links = document.getElementById('links');

var catch_management_id;
var catch_user_id = [];
var id_user;

var _token = null;
var getUser;

let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('Authorization', window.btoa(user_.value + ":" + pass_.value));

button_submit.addEventListener('click', async function load(){
    mainLogin();
})

async function mainLogin(){
    try{
        await fetch(url_api + '/login', { 
            mode: "cors",
            method: 'POST',
            body: JSON.stringify({
                name: user_.value,
                password: pass_.value
            }),
            credentials: "same-origin",
        })
        .then(response => {
            if(user_.value == "" || pass_.value == ""){
                error_auth.innerHTML = 'Usuário ou senha inválido'
                error_visible.style.visibility = "visible"
                links.style.top = "30px";
                load_circle.style.visibility = 'hidden'
                return false;
            }
            if(response.status == 403){
                error_auth.innerHTML = 'Usuário ou senha inválido'
                error_visible.style.visibility = "visible"
                links.style.top = "30px";
                load_circle.style.visibility = 'hidden'
                return response.json();
            }
            if(getCookie('usr_tkn') || response.status == 200){
                window.location.href = './routes/home.html';
                load_circle.style.visibility = 'visible'
                return response.json();
            }
        })
        .then(token => {
            getUser = token;
            _token = token.access_token;
        });
        localStorage.setItem("id_session", getUser.id);
        localStorage.setItem("name_session", getUser.userName);
        let user = getCookie("usr_tkn");
        user = _token;
        if (user != "" && user != null) {
            setCookie("usr_tkn", user, 30);
        }
    }catch(err){
        console.log(err);
    }
    id_user = localStorage.getItem("id_session");
    getManagement();
}

async function getManagement(){
    let bearer = getCookie("usr_tkn");
    await fetch(url_api + "/management", {
        headers:{
            "Authorization":"Bearer " + bearer
        },
        mode: "cors",
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i <= data.length; i++){
            catch_user_id = [data[i].user.id]
            if(id_user == catch_user_id){
                catch_management_id = data[i].id
                localStorage.setItem("management_session", catch_management_id);
                console.log(localStorage.getItem("management_session"));
            }
        }
    });
}