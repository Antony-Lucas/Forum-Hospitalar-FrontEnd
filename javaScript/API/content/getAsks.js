import { url_api } from "../config.js";
import { getCookie } from "../cookie/cookies.js";
let bearer = getCookie("usr_tkn");
let catchUserName = document.getElementById("myUserName");
var name_user = localStorage.getItem("name_session");
var ask_user_id;
var ask_user_name = [];
var ask_content = [];
var ask_img = [];
var ask_moment = [];

let id_count = 0;

async function req(){
    console.log(bearer);
    await fetch(url_api+ '/modules/departments',{
        headers:{
          'Authorization':'Bearer ' + bearer  
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
        localStorage.setItem("dep_id", data[0].id);
        for(let i = 0; i <= data[0].asks.length; i++){
          id_count++;
          ask_user_id = [data[0].asks[i].id]
          ask_user_name = [data[0].asks[i].userName.userName]
          ask_img = [data[0].asks[i].imageUrl]
          ask_content = [data[0].asks[i].content];
          ask_moment = [data[0].asks[i].moment];

          let mainDiv = document.getElementById('newAsks');
          let element = document.createElement('div');
          mainDiv.appendChild(element);
          element.insertAdjacentHTML(
            'afterbegin', 
            `<div class="ask-header-content">
                <span class="material-symbols-outlined">account_circle</span>
                <div class="ask-body-content">
                  <h4>${ask_user_name}</h4>
                  <p class='ask-content'>${ask_content}</p>
                  <img class='img-ask' src="${ask_img}">
                  <p class='ask-moment'>${ask_moment}</p>
                  <a id="showModal" onclick="setIdAsk(${ask_user_id}); openAnswersModal();">Responder</a>
                </div>
            </div>`
          )
        }
    }
  )
}


window.onload = function(){
  catchUserName.innerHTML = name_user;
  if(getCookie('usr_tkn') == ""){
      window.location.href = '../../../index.html';
  }
}
req();