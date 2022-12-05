var user_name = localStorage.getItem("name_usr");
var pass_name = localStorage.getItem("pass_usr");

//Função para atualizar o cookie
window.setInterval(async function(){
    await fetch('http://localhost:8080/login',{
        headers: {"Authorization" : "Bearer " + getCookie("usr_tkn")},
        method: "POST",
        body: JSON.stringify({
            name: user_name,
            password: pass_name
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        setCookie("usr_tkn", data.access_token, 30);
    })
}, 1100000)

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