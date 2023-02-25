var my_body_asks = document.getElementById("myBodyAsks");
var ask_content_user = document.createElement("span");

my_body_asks.appendChild(ask_content_user);
ask_content_user.innerHTML = 
`<span class="material-symbols-outlined">account_circle</span>`

async function requesUserAsks(){
    console.log(url_api.asks)
    await fetch(url_api.asks, {
        headers: {
            "Authorization":"Bearer " + getCookie("usr_tkn")
        },
        mode: "cors",
        method: "GET"
    }).then(
        response => response.json()
    ).then(data => {
        console.log(data)
    })
}

requesUserAsks();