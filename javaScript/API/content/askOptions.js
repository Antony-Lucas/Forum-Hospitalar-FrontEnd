const context_menu = document.querySelector(".wrapper");
const context_id = document.getElementById("wrapper");
const body_asks = document.getElementById("bodyAsks");

async function askActions(e){
    console.log("ask "+ e);
    context_menu.style.display = "block"
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