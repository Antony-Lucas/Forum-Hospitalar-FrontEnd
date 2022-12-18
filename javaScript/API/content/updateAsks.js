async function testGet(e){
    $( "#newAsks" ).load(window.location.href + " #newAsks" );
    console.log(e)
    await fetch("http://localhost:8080/modules/departments", {
        headers: {
          "Authorization":"Bearer " + getCookie("usr_tkn")
        },
        method: "GET",
        mode: "cors"
    })
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data[e].asks.length; i++){
            var ask_user_id = [data[e].asks[i].id]
            var ask_user_name = [data[e].asks[i].userName.userName]
            var ask_content = [data[e].asks[i].content];
            var ask_moment = [data[e].asks[i].moment];

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
    });
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