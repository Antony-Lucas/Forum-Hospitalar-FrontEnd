var arr = [];

function testGet(e){
    setTimeout(async function(){
        $( "#newAsks" ).load(window.location.href + " #newAsks" );
        arr = [e].shift(); 
        console.log(arr);
        await fetch("http://localhost:8080/modules/departments", {
            headers: {
                "Authorization":"Bearer " + getCookie("usr_tkn")
            },
            method: "GET",
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < data[arr].asks.length; i++){
                var ask_dep = data[arr].id;
                var ask_user_id = [data[arr].asks[i].id]
                var ask_user_name = [data[arr].asks[i].userName.userName]
                var ask_img = [data[e].asks[i].imageUrl];
                var ask_content = [data[arr].asks[i].content];
                var ask_moment = [data[arr].asks[i].moment];

                let mainDiv = document.getElementById('newAsks');
                let element = document.createElement('span');
                
                mainDiv.appendChild(element);
                element.innerHTML =
                    `<span id="askActions${ask_user_id}" oncontextmenu="askActions(${ask_user_id}, ${ask_dep});" class="ask-header-content">
                        <span class="material-symbols-outlined">account_circle</span>
                        <div class="ask-body-content">
                        <div class="os">
                            <h4>${ask_user_name}</h4>
                            <span title="Arquivo anexado" id="attachFile${ask_user_id}" class="material-symbols-outlined">attach_file</span>
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
                    </span>`;
                
                const attach_file_ask = document.getElementById(`attachFile${ask_user_id}`);
                if(ask_img == "" || ask_img.length < 1){
                    attach_file_ask.style.display = "none";
                }else{
                    attach_file_ask.style.fontSize = "17px";
                    attach_file_ask.style.marginRight = "8px";
                }
            }
        });
    }, 3000); 
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