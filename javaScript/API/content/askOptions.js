const context_menu = document.querySelector(".wrapper");
const context_id = document.getElementById("wrapper");
const body_asks = document.getElementById("bodyAsks");
const delete_ask = document.getElementById("excludeAsk");
const edit_ask = document.getElementById("editAsk");
const modal_exclude = document.getElementById("myModal");
const modal_edit = document.getElementById("myModalEdit");
const buttonExclude = document.getElementById("butonExclude");

async function askActions(e){
    console.log("ask "+ e);
    context_menu.style.display = "block";

    buttonExclude.addEventListener("click", function(){
        console.log("delete" + e);
        try {
            fetch(`http://localhost:8080/modules/departments/asks/${e}`,{
                headers: {
                    "Authorization":"Bearer " + getCookie("usr_tkn")
                },
                method: "DELETE",
                mode: "cors"
            }).then(response => console.log(response.json()));
        } catch (error) {
            console.log(error);
        }
        e = null;
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
    x = x > winWidth - cmWidth ? winWidth - cmWidth : x;
    y = y > winHeigth - cmHeight ? winHeigth - cmHeight : x;
});

body_asks.addEventListener("click", function(){
    context_menu.style.display = "none";
})

body_asks.addEventListener("wheel", function(){
    context_menu.style.display = "none";
})

delete_ask.addEventListener("click", function(){
    context_menu.style.display = "none";
    modal_exclude.style.display = "block";
})

edit_ask.addEventListener("click", function(){
    context_menu.style.display = "none";
    modal_edit.style.display = "block"
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