import { url_api } from "../config.js";
import { getCookie } from "../cookie/cookies.js";

const date_ = new Date();

let bearer = getCookie("usr_tkn");
var submit_ask = document.getElementById("submitAsk");
var user_id = localStorage.getItem("id_session");
var management_id = localStorage.getItem("management_session");
var getTime = date_.toLocaleString();
var setImage = document.getElementById("image-button");
var setDep = 1;

var setUrlImage;
submit_ask.addEventListener("click", async function(){
    const formData = new FormData();
    formData.append('file', setImage.files[0]);
    formData.append('url', 'filename');
    try {
        await fetch(url_api + "/upload",{
            method: "POST",
            headers: {
                "Authorization":"Bearer " + bearer
            },
            body: formData
        }).then(function(response) {
            return response.text();
        })
        .then(function(data) {
            var imageLink = data;
            setUrlImage = imageLink;
            console.log("upload: "+imageLink);
            return imageLink;
        })
    } catch (error) {
        console.log(error);
    }

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
                imageUrl: setUrlImage,
                client: { id: setDep },
                userName: { id: user_id },
                management: { id: management_id }
            })
        })
        .then(Response => Response.json())
        console.log("variable3 "+setUrlImage);
    }catch(err){
        console.log(err);
    }
    document.getElementById("askContent").value = "";
})