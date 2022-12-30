const body_closer = document.getElementById("bodyContainerClose");
const header_closer = document.getElementById("headerCo");
const context_menu = document.querySelector(".wrapper");
const context_id = document.getElementById("wrapper");
const body_asks = document.getElementById("bodyAsks");
const delete_ask = document.getElementById("excludeAsk");
const edit_ask = document.getElementById("editAsk");
const modal_exclude = document.getElementById("myModal");
const modal_edit = document.getElementById("myModalEdit");
const buttonExclude = document.getElementById("butonExclude");
const buttonUpdate = document.getElementById("butonSave");
const textAreaEdit = document.getElementById("askEditContent");
const managementId = localStorage.getItem("management_session");
const name_id = localStorage.getItem("name_session"); 

var catchImagePath;
var arr = [];
var depArr = [];
var attArrId = [];

async function askActions(e, arg){
    const date_get = new Date();
    var getTime = date_get.toLocaleString();
    arr = [e];
    depArr = [arg-1];
    
    context_menu.style.display = "none";
    
    try {
        await fetch(`http://localhost:8080/modules/departments/asks/${arr}`,{
            headers: {
                "Authorization" : "Bearer " + getCookie("usr_tkn")
            },
            method: "GET",
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            catchImagePath = data.imageUrl;

            if(name_id == data.userName.userName){
                context_menu.style.display = "block";
            }

            edit_ask.addEventListener("click", async function(){
                context_menu.style.display = "none";
                modal_edit.style.display = "block";
                textAreaEdit.value = data.content;
            })
        })
    } catch (error) {
        console.log(error);
    }

    buttonUpdate.addEventListener("click", async function(){
        fetch(`http://localhost:8080/modules/departments/asks/${arr}`,{
            headers: {
                "Content-Type": "application/json; charset=utf8",
                "Authorization" : "Bearer " + getCookie("usr_tkn")
            },
            method: "PUT",
            mode: "cors",
            body: JSON.stringify({
                content: textAreaEdit.value,
                moment: getTime,
                client: { id: depArr+1 },
                management: { id: managementId }
            })
        }).then(response => response.json())
        .then(data => {
            attArrId = [data.id];
            const nu = depArr.shift();
            
            if(nu != undefined){
                console.log(nu);
                testGet(nu);
            }
            
        })
        modal_edit.style.display = "none";
    })

    buttonExclude.addEventListener("click", async function(){
        console.log(arr);
        try {
            await fetch(`http://localhost:8080/modules/departments/asks/${arr}`,{
                headers: {
                    "Authorization" : "Bearer " + getCookie("usr_tkn")
                },
                method: "DELETE",
                mode: "cors"
            })
            .then(response => console.log(response.json()));

            if(catchImagePath.length != 0){

                fetch(`http://localhost:8080/delete?fileName=${catchImagePath.slice(40)}`, {
                    headers: {
                        "Authorization" : "Bearer " + getCookie("usr_tkn")
                    },
                    method: "DELETE",
                    mode: "cors"
                })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                })
            }

            const removeAskInDom = document.getElementById(`askActions${arr}`);
            setTimeout(function(){
                removeAskInDom.remove();
            },1000)
        } catch (error) {
            console.log(error);
        }
        modal_exclude.style.display = "none";
    })

}

body_asks.addEventListener("contextmenu", ev =>{
    ev.preventDefault();
    const{clientX: mouseX, clientY: mouseY} = ev;
    
    context_id.style.left = `${mouseX}px`;
    context_id.style.top = `${mouseY}px`;

    var winWidth = window.innerWidth;
    var cmWidth = context_menu.offsetWidth;
    var winHeigth = window.innerHeight;
    var cmHeight = context_menu.offsetHeigth
    var x = x > winWidth - cmWidth ? winWidth - cmWidth : x;
    var y = y > winHeigth - cmHeight ? winHeigth - cmHeight : x;
});

body_asks.addEventListener("click", function(){
    context_menu.style.display = "none";
})

body_asks.addEventListener("wheel", function(){
    context_menu.style.display = "none";
})

body_closer.addEventListener("click", function(){
    context_menu.style.display = "none";
})

header_closer.addEventListener("click", function(){
    context_menu.style.display = "none";
})

delete_ask.addEventListener("click", function(){
    context_menu.style.display = "none";
    modal_exclude.style.display = "block";
})

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