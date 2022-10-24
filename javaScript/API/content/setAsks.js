import { url_api } from "../config.js";
import { getCookie } from "../cookie/cookies.js";

const date_ = new Date();
let bearer = getCookie("usr_tkn");
var submit_ask = document.getElementById("submitAsk");
var user_id = localStorage.getItem("id_session");
var management_id = localStorage.getItem("management_session");
var getTime = date_.toLocaleString();

submit_ask.addEventListener("click", async function(){
    var set_ask = document.getElementById("askContent").value;
    console.log("content: "+ set_ask);
    console.log("moment: "+ getTime);
    console.log("departmentid: "+ 1);
    console.log("userid: "+ user_id);
    console.log("management: "+ management_id);
    try{
        await fetch(url_api + "/modules/departments/asks", {
            headers: {
                "Authorization":"Bearer " + bearer
            },
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            body: JSON.stringify({
                content: set_ask,
            })
        })
    }catch(err){
        console.log(err);
    }
})