import { url_api } from "../config.js";
import { getCookie } from "../cookie/cookies.js";

const date_ = new Date();

let bearer = getCookie("usr_tkn");
var submit_ask = document.getElementById("submitAsk");
var user_id = localStorage.getItem("id_session");
var management_id = localStorage.getItem("management_session");
var getTime = date_.toLocaleString();
var setDep = 1;

submit_ask.addEventListener("click", async function(){
    var set_ask = document.getElementById("askContent").value;
    try{
        await fetch(url_api + "/modules/departments/asks", {
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
                client: { id: setDep },
                userName: { id: user_id },
                management: { id: management_id }
            })
        })
        .then(Response => Response.json())
    }catch(err){
        console.log(err);
    }
    document.getElementById("askContent").value = "";
})