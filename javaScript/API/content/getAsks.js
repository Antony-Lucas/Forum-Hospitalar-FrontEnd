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
        e = e - 1;
        console.log(e);
        var loadAsks = document.getElementById("bodyAsks");
        loadAsks.innerHTML = `
        <div class="ask-content">
                <div class="ask-header">
                    <div class="ask-header-container">
                        <h3>${data[e].nameDepartment}</h3>
                    </div>
                </div>
                <div class="ask-body">
                    <div id="mainDiv" class="body-content-ask">
                        <div class="add-ask">
                            <textarea id="askContent" cols="60" rows="2" placeholder="Faça uma pergunta..."></textarea>

                            <label for="image-button">
                              <span title="Anexar imagem" id="cameraIcon" class="material-symbols-outlined" style="font-size: 20px; margin-right: 0px; margin-left: 15px;">
                                photo_camera
                              </span>
                            </label>
                            <input id="image-button" class="add-ask-image" type="file" accept="image/png, image/gif, image/jpeg">                      
                            
                            <div class="add-ask-buttons">
                                <div class="add-ask-buttons-container">
                                    <button onclick="testGet(${e})" id="submitAsk" type="button" class="add-ask-submit">Publicar</button>
                                </div>
                            </div>
                        </div>
                        <div id="imageList"></div> 
                          <p class="ask-body-recently">Recentes</p>
                        <div id="newAsks">
                          <div class="bg-preloader" id="preloader">
                              <div class="preloader"></div>
                          </div>
                        </div>
                    </div>
                </div>
        </div>
        `
        
        const date_ = new Date();
        const buttonExclude = document.getElementById("butonExclude");
        var user_id = localStorage.getItem("id_session");
        var management_id = localStorage.getItem("management_session");
        var getTime = date_.toLocaleString();
        var setImage = document.getElementById("image-button");
        var submit_ask = document.getElementById("submitAsk");
        var newAsks = document.getElementById("newAsks");
        let input_file = document.getElementById("image-button");
        let image_list = document.getElementById("imageList");
        var preloader = document.getElementById("preloader");
        var submit_ask_query = document.querySelector("#submitAsk").disabled;
        var setUrlImage = "";

        newAsks.style.overflow = "hidden";
        preloader.onload = setTimeout(function(){
          newAsks.style.overflow = "initial";
          preloader.style.display = "none";
        },2000)

        buttonExclude.addEventListener("click", function(){
          preloader.style.visibility = "visible";
          preloader.style.display = "flex";
          newAsks.style.overflow = "hidden";

          setTimeout(function(){
            preloader.style.visibility = "false";
            newAsks.style.overflow = "initial";
            preloader.style.display = "none";
          },3200)

          console.log("teste" + e);
          testGet(e)
        });
        
        submit_ask.addEventListener("click", async function setAsk(){
          var set_ask = document.getElementById("askContent").value;

          newAsks.style.overflow = "hidden"
          submit_ask_query = true;
          submit_ask.style.backgroundColor = "#239037";
          preloader.style.display = "flex";
        
          setTimeout(function(){
            submit_ask_query = false;
            submit_ask.style.backgroundColor = "#1b6e2a";
            newAsks.style.overflow = "initial";
            console.log("asd");
          },3200)

          const formData = new FormData();
          if(setImage.files[0] != undefined){
            formData.append('file', setImage.files[0]);
            formData.append('url', 'filename');
            try {
                await fetch("http://localhost:8080/upload",{
                    method: "POST",
                    headers: {
                        "Authorization":"Bearer " + getCookie("usr_tkn")
                    },
                    body: formData
                }).then(function(response) {
                    return response.json();
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
              client: { id: e+1 },
              userName: { id: user_id },
              management: { id: management_id }
            })
            })
            .then(Response => Response.json())
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

        for(let i = 0; i <= data[e].asks.length; i++){
          ask_user_id = [data[e].asks[i].id]
          ask_user_name = [data[e].asks[i].userName.userName]
          ask_img = [data[e].asks[i].imageUrl]
          ask_content = [data[e].asks[i].content];
          ask_moment = [data[e].asks[i].moment];

          console.log(ask_user_id);

          let mainDiv = document.getElementById('newAsks');
          let element = document.createElement('span');
          
          mainDiv.appendChild(element);
          element.insertAdjacentHTML(
            'afterbegin', 
            `<span id="askActions" oncontextmenu="askActions(${ask_user_id});" id="askActions" class="ask-header-content">
                <span class="material-symbols-outlined">account_circle</span>
                <div class="ask-body-content">
                  <div class="os">
                    <h4>${ask_user_name}</h4>
                    <p class="ask-os-number">#${ask_user_id}</p>
                  </div>
                  <p class='ask-content'>${ask_content}</p>
                  <p class='ask-moment'>${ask_moment}</p>
                  <a id="showModal" onclick="setIdAsk(${ask_user_id}); openAnswersModal();">
                    <div class="ask-comment">
                      <span class="material-symbols-outlined">chat</span>
                      <p>Comentar</p>
                    </div>
                  </a>
                </div>
            </span>`
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