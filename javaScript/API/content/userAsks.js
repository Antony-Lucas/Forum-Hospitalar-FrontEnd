var my_body_asks = document.getElementById("myBodyAsks");
var ask_content_user = document.createElement("span");
const management_session_id = localStorage.getItem("management_session");
const closeMyAsks = document.getElementById("closeMyAsks");
let myBodyAsks = document.getElementById("myBodyAsks");
let myBodyAsksAnswers = document.getElementById("myBodyAsksAnswers");

async function requesUserAsks(){
    console.log(url_api.management)
    await fetch(url_api.management, {
        headers: {
            "Authorization":"Bearer " + getCookie("usr_tkn")
        },
        mode: "cors",
        method: "GET"
    }).then(
        response => response.json()
    ).then(data => {
        dataUserAsks(data)
    })
}

function dataUserAsks(data){
    for(let i = 0; i < data.length; i++){
        if(data[i].id == management_session_id){
            for(let c = 0; c < data[i].asks.length; c++){
                console.log(data[i].asks[c]);
                ask_user_id = [data[i].asks[c].id]
                ask_dep = [data[i].asks[c].depId]
                ask_user_name = [data[i].asks[c].userName.userName]
                ask_content = [data[i].asks[c].content]
                ask_img = [data[i].asks[c].imageUrl]
                ask_moment = [data[i].asks[c].moment]

                my_body_asks.appendChild(ask_content_user);
                ask_content_user.innerHTML +=
                `
                <span id="askActions${ask_user_id}" oncontextmenu="askActions(${ask_user_id}, ${ask_dep});" class="ask-header-content">
                    <span class="material-symbols-outlined">account_circle</span>
                    <div class="ask-body-content" id="contentAsk">
                        <div class="os">
                        <h4>${ask_user_name}</h4>
                        <span title="Arquivo anexado" id="attachFile${ask_user_id}" class="material-symbols-outlined">attach_file</span>
                        <p class="ask-os-number">#${ask_user_id}</p>
                        </div>
                        <p class='ask-content'>${ask_content}</p>
                        <p class='ask-moment'>${ask_moment}</p>
                        <a id="showModal" onclick="setIdAsk(${ask_user_id}); openMyAsk(${ask_user_id})">
                            <div class="ask-comment">
                            <span class="material-symbols-outlined">chat</span>
                            <p>Comentar</p>
                            </div>
                        </a>
                    </div>
                </span>
                `;

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

function openMyAsk(e){
    console.log(e);
    myBodyAsks.style.width = "50%";  
    myBodyAsksAnswers.style.width = "50%";
    myBodyAsksAnswers.style.display = "block";    
    closeMyAsks.style.display = "block"         
}

closeMyAsks.addEventListener("click", function(){
    myBodyAsksAnswers.style.display = "none";
    closeMyAsks.style.display = "none";
    myBodyAsks.style.width = "100%";
})

requesUserAsks();