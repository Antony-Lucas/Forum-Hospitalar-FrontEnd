import { url_api } from "../config.js";
let bearer = getCookie("usr_tkn");
var ask_user_name = [];
var ask_content = [];
var ask_img = [];
var ask_moment = [];

var data_;

async function req(){
    console.log(bearer);
    await fetch(url_api+ '/modules/departments/asks',{
        headers:{
          'Authorization':'Bearer '+ bearer  
        },
        mode: 'cors',
        method: 'GET'
    })
    .then(
        response => {
            if(response.status == 403){
                window.location.href = '../../../index.html';
                return response.json();
            }
            return response.json();
        }
    )
    .then(data => {
        data_ = data

        for(let i = 0; i <= data.length; i++){
          ask_user_name = [data[i].userName.userName]
          ask_content = [data[i].content];
          ask_moment = [data[i].moment];
          
          console.log(data)
          console.log(ask_user_name)
          console.log(ask_content)
          console.log(ask_img)
          console.log(ask_moment)
          let mainDiv = document.getElementById('mainDiv');
          let element = document.createElement('div');
          mainDiv.appendChild(element);
          element.insertAdjacentHTML(
            'beforeend', 
            `<div class="ask-header-content">
                <span class="material-symbols-outlined">account_circle</span>
                <div class="ask-body-content">
                  <h4>${ask_user_name}</h4>
                  <p>${ask_content}</p>
                  <p>${ask_moment}</p>
                  <a id="id="showModal" href="#">Responder</a>
                </div>
            </div>`
          )
        }
    })
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

req();