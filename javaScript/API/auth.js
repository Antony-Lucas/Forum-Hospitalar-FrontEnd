const url = 'http://localhost:8080';

let button_submit = document.getElementById('mySubmit')
let user_ = document.getElementById('username');
let pass_ = document.getElementById('password');
var error_auth = document.getElementById('login-error-info');
var error_visible = document.getElementById('error_empty_field');
var circle_ = document.getElementById('loader');

var _token = null;

let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('Authorization', btoa(user_.value + ":" + pass_.value));

button_submit.addEventListener('click', async function(){
    try{
        await fetch(url + '/login', { 
            mode: "cors",
            method: 'POST',
            body: JSON.stringify({
                name: user_.value,
                password: pass_.value
            }),
            credentials: "same-origin",
        })
        .then(response => {
            if(response.status == 200){
                window.location.href = './routes/home.html';
                load_circle.style.visibility = 'visible'
                return response.json()
            }
            if(response.status == 403 && user_.value != '' && pass_.value != ''){
                error_auth.innerHTML = 'Usuário ou senha inválido'
                error_visible.style.visibility = "visible"
                load_circle.style.visibility = 'hidden'
                return response.json()
            }
        })
        .then(token => {
            _token = token.access_token;
        });
        let user = getCookie("usr_tkn");
        user = _token;
        if (user != "" && user != null) {
            setCookie("usr_tkn", user, 30);
        }
    }catch(err){
        console.log(err);
    }
})

function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}