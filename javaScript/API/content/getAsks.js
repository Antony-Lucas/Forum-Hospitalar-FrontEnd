let bearer = getCookie("usr_tkn");
let catchUserName = document.getElementById("myUserName");
var name_user = localStorage.getItem("name_session");
var ask_user_id;
var ask_user_name = [];
var ask_content = [];
var ask_img = [];
var ask_moment = [];

async function req(e){
    await fetch('http://localhost:8080/modules/departments',{
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
        e = e - 1;
        console.log(e);
        var loadAsks = document.getElementById("bodyAsks");
        loadAsks.innerHTML = `
        <div class="ask-content">
                <div class="ask-header">
                    <div class="ask-header-container">
                        <h3>${data[e].nameDepartment}</h3>
                    </div>
                    <div class="ask-body-search">
                        <input type="text" placeholder="&#x1F50E;&#xFE0E;" id="searchbar">
                    </div>
                </div>
                <div class="ask-body">
                    <div id="mainDiv" class="body-content-ask">
                        <div class="add-ask">
                            <label for="image-button"><span title="Anexar imagem" class="material-symbols-outlined" style="font-size: 20px">photo_camera</span></label>
                            <input id="image-button" class="add-ask-image" type="file" accept="image/png, image/gif, image/jpeg">                      
                            <textarea id="askContent" cols="60" rows="1" placeholder="Faça uma pergunta..."></textarea>
                            <div class="add-ask-buttons">
                                <div class="add-ask-buttons-container">
                                    <button id="submitAsk" type="button" class="add-ask-submit">Publicar</button>
                                </div>
                            </div>
                        </div>
                        <div id="imageList"></div> 
                          <p class="ask-body-recently">Recentes</p>
                        <div id="newAsks"></div>
                    </div>
                </div>
        </div>
        `
        const date_ = new Date();
        var user_id = localStorage.getItem("id_session");
        var management_id = localStorage.getItem("management_session");
        var getTime = date_.toLocaleString();
        var setImage = document.getElementById("image-button");
        var submit_ask = document.getElementById("submitAsk");
        var setUrlImage = "";

        let input_file = document.getElementById("image-button");
        let image_list = document.getElementById("imageList");
        
        submit_ask.addEventListener("click", async function setAsk(){
          var set_ask = document.getElementById("askContent").value;
          console.log("department "+ e+1)
          console.log("user "+ user_id);
          console.log("content "+ set_ask);
          console.log("management "+management_id);
          console.log("moment "+getTime);
          const formData = new FormData();
          if(setImage.files[0] != undefined){
            formData.append('file', setImage.files[0]);
            formData.append('url', 'filename');
            try {
                await fetch("http://localhost:8080/upload",{
                    method: "POST",
                    headers: {
                        "Authorization":"Bearer " + bearer
                    },
                    body: formData
                }).then(function(response) {
                    return response.text();
                })
                .then(function(data) {
                    var imageLink = data;
                    setUrlImage = imageLink;
                    console.log("upload: "+imageLink);
                    return imageLink;
                })
            } catch (error) {
                console.log(error);
            }
          }

          await fetch("http://localhost:8080/modules/departments/asks", {
            headers: {
              "Content-Type": "application/json; charset=utf8",
              "Authorization":"Bearer " + bearer
            },
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            body: JSON.stringify({
              content: set_ask,
              moment: getTime,
              imageUrl: setUrlImage,
              client: { id: e+1 },
              userName: { id: user_id },
              management: { id: management_id }
            })
            })
            .then(Response => Response.json())
            console.log("image url "+setUrlImage);
           document.getElementById("askContent").value = "";
        })

        input_file.addEventListener("change", function(){
          image_list.innerHTML = '<ul>';
          for(let i = 0; i < input_file.files.length; i++){
              image_list.innerHTML += 
              `
              <li class="imageList-list">
                  <span class='image-label'>${input_file.files.item(i).name}</span>
                  <span id="imageFl" class="material-symbols-outlined" style="font-size: 15px;">
                      close 
                  </span>
              </li>
              `
          }
          image_list.innerHTML += '</ul>'
          imageFl.addEventListener("click", function(){
            input_file.value = null;
            image_list.innerHTML = null;
          })
        });

        for(let i = 0; i <= data[e].asks.length; i++){
          ask_user_id = [data[e].asks[i].id]
          ask_user_name = [data[e].asks[i].userName.userName]
          ask_img = [data[e].asks[i].imageUrl]
          ask_content = [data[e].asks[i].content];
          ask_moment = [data[e].asks[i].moment];

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
                  <p class='ask-moment'>${ask_moment}</p>
                  <a id="showModal" onclick="setIdAsk(${ask_user_id}); openAnswersModal();">
                    <div class="ask-comment">
                      <span class="material-symbols-outlined">chat</span>
                      <p>Comentar</p>
                    </div>
                  </a>
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