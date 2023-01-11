const askFirstContent = document.getElementById("askFirstContent");
let catchUserName = document.getElementById("myUserName");
var name_user = localStorage.getItem("name_session");
var ask_dep;
var ask_user_id;
var name_dep;
var ask_user_name = [];
var ask_content = [];
var ask_img = [];
var ask_moment = [];

async function req(e){
  showOfAskFirstContent();
  await fetch('http://localhost:8080/modules/departments',{
    headers:{
      'Authorization':'Bearer ' + getCookie("usr_tkn")
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
      for(let i = 0; i <= data.length; i++){
        if(e == data[i].id){
          console.log(e)
          name_dep = data[i].nameDepartment
          var loadAsks = document.getElementById("bodyAsks");
          loadAsks.innerHTML =
          `
            <div class="bg-preloader" id="preloader">
                <div class="preloader"></div>
            </div>
            <div class="ask-content">
              <div class="ask-header">
                  <div class="ask-header-container">
                      <h3>${name_dep}</h3>
                  </div>
              </div>
              <div class="ask-body">
                <div id="mainDiv" class="body-content-ask">
                  <div class="add-ask">
                      <textarea id="askContent" cols="60" rows="1" placeholder="Faça uma pergunta..."></textarea>
                      <label for="image-button">
                        <span title="Anexar imagem" id="cameraIcon" class="material-symbols-outlined" style="font-size: 20px; margin-right: 0px; margin-left: 15px;">
                          photo_camera
                        </span>
                      </label>
                      <input id="image-button" class="add-ask-image" type="file" accept="image/png, image/gif, image/jpeg">                      
                                
                      <div class="add-ask-buttons">
                        <div class="add-ask-buttons-container">
                          <button onclick="testGet(${e});" id="submitAsk" type="button" class="add-ask-submit">Publicar</button>
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
          const buttonExclude = document.getElementById("butonExclude");
          const buttonUpdate = document.getElementById("butonSave");
          const management_id = localStorage.getItem("management_session");
          
          var getTime = date_.toLocaleString();
          var setImage = document.getElementById("image-button");
          var submit_ask = document.getElementById("submitAsk");
          var newAsks = document.getElementById("newAsks");
          let input_file = document.getElementById("image-button");
          let image_list = document.getElementById("imageList");
          var preloader = document.getElementById("preloader");
          var setUrlImage = "";

          newAsks.style.overflow = "hidden";
          preloader.onload = setTimeout(function(){
            newAsks.style.overflow = "initial";
            preloader.style.display = "none";
            console.log("id load" + e);
          },1500)

          buttonExclude.addEventListener("click", function(){
            newAsks.style.opacity = "0.7";
            setTimeout(function(){
              newAsks.style.opacity = "1";
            },1000)
          })

          buttonUpdate.addEventListener("click", function(){
            newAsks.style.opacity = "0.7";
            setTimeout(function(){
              newAsks.style.opacity = "1";
            },3000)
          })
    
          submit_ask.addEventListener("click", async function setAsk(){
            var set_ask = document.getElementById("askContent").value;

            newAsks.style.opacity = "0.7";
            document.querySelector("#submitAsk").disabled = true;
            submit_ask.style.opacity = "0.6"
            submit_ask.style.boxShadow = "none";
            
            setTimeout(function(){
              document.querySelector("#submitAsk").disabled = false;
              submit_ask.style.opacity = "1"
              newAsks.style.opacity = "1";
              preloader.style.display = "none";
            },3600)

            const formData = new FormData();
            if(setImage.files[0] != undefined){
              try {
                formData.append('file', setImage.files[0]);
                formData.append('url', 'filename');
                await fetch("http://localhost:8080/upload",{
                  method: "POST",
                  headers: {
                    'Authorization':'Bearer ' + getCookie('usr_tkn')
                  },
                  body: formData
                  }).then(response => response.text())
                  .then(data => {
                    var imageLink = data;
                    setUrlImage = imageLink;
                    console.log("upload: "+imageLink);
                  }
                )
              } catch (error) {
                  console.log(error);
              }
            }

            input_file.value = null;
            image_list.innerHTML = null;

            await fetch("http://localhost:8080/modules/departments/asks", {
              headers: {
                "Content-Type": "application/json; charset=utf8",
                "Authorization":"Bearer " + getCookie("usr_tkn")
              },
              method: "POST",
              mode: "cors",
              credentials: "same-origin",
              body: JSON.stringify({
                content: set_ask,
                moment: getTime,
                imageUrl: setUrlImage,
                client: { id: e },
                userName: { id: user_id },
                management: { id: management_id }
              })
              })
              .then(Response => Response.json())
                document.getElementById("askContent").value = "";
              })

            input_file.addEventListener("change", function(){
            image_list.innerHTML = '<ul>';
            for(let c = 0; c < input_file.files.length; c++){
                image_list.innerHTML += 
                `
                <li class="imageList-list">
                    <span class='image-label'>${input_file.files.item(c).name}</span>
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

          fetch("http://localhost:8080/modules/departments/asks", {
            headers: {
              "Authorization":"Bearer " + getCookie("usr_tkn")
            },
            method: "GET",
            mode: "cors"
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          });

          for(let c = 0; c <= data[i].asks.length; c++){
            ask_dep = data[i].id;
            ask_user_id = [data[i].asks[c].id];
            ask_user_name = [data[i].asks[c].userName.userName];
            ask_img = [data[i].asks[c].imageUrl];
            ask_content = [data[i].asks[c].content];
            ask_moment = [data[i].asks[c].moment];

            let mainDiv = document.getElementById('newAsks');
            let element = document.createElement('span');
            
            mainDiv.appendChild(element);
            element.innerHTML =
              `<span id="askActions${ask_user_id}" oncontextmenu="askActions(${ask_user_id}, ${ask_dep});" class="ask-header-content">
                  <span class="material-symbols-outlined">account_circle</span>
                  <div class="ask-body-content" id="contentAsk">
                    <div class="os">
                      <h4>${ask_user_name}</h4>
                      <span title="Arquivo anexado" id="attachFile${ask_user_id}" class="material-symbols-outlined">attach_file</span>
                      <p class="ask-os-number">#${ask_user_id}</p>
                    </div>
                    <p class='ask-content'>${ask_content}</p>
                    <p class='ask-moment'>${ask_moment}</p>
                    <a id="showModal" onclick="setIdAsk(${ask_user_id})">
                      <div class="ask-comment">
                        <span class="material-symbols-outlined">chat</span>
                        <p>Comentar</p>
                      </div>
                    </a>
                  </div>
              </span>`;
            
            const attach_file_ask = document.getElementById(`attachFile${ask_user_id}`);
            if(ask_img == "" || ask_img.length < 1){
              attach_file_ask.style.display = "none";
            }else{
              attach_file_ask.style.fontSize = "17px";
              attach_file_ask.style.marginRight = "8px";
            }
          }
        }
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

function showOfAskFirstContent(){
  askFirstContent.style.display = "none";
}

function showOnAskFirstContent(){
  askFirstContent.style.display = "block";
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