let url_api = 'http://localhost:8080';
let username = "AntonyLucas2";
let password = "sim";
var _token = null;
var cookies = null;

let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('Authorization', btoa(username + ":" + password));
async function req(){
    try{
        await fetch(url_api + '/login', { 
            mode: "cors",
            method: 'POST',
            body: JSON.stringify({
                name: username,
                password: password
            }),
            credentials: "same-origin"
        })
        .then(response => response.json())
        .then(token => {
            _token = token.access_token;
            let value = getCookie(_token);
            if(value != "" && value != null){
                createCookie("auth_tkn", value, 30);
            }
            return _token;
        });
        console.log(_token);
    }catch(err){
        console.log(err);
    }
}

function createCookie(name, value, days){
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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

req();