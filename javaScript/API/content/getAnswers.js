import { url_api } from "../config.js";
import { getCookie } from "../cookie/cookies.js";
var bearer = getCookie("usr_tkn");
var setTest = document.getElementById("idAsk");
var get_id_asks;

async function reqAnswers(){
    var ask_id = localStorage.getItem("id_ask");
    console.log("id ask: " + ask_id)
    await fetch(url_api + '/modules/departments/asks', {
        headers: {
            "Authorization" : "Bearer " + bearer
        },
        mode: "cors",
        method: "GET"
    }).then(response => {
        return response.json()
    }).then(data => {
        setTest.innerHTML = ask_id;
        console.log(setTest.value);
        var childrenDiv = document.getElementById("answerChildrens");
        for(let i = 0; i <= data.length; i++){
            get_id_asks = data[i].id
            console.log("id: "+get_id_asks);
            
        }
    })
}

reqAnswers();