const date_ = new Date();

let bearer = getCookie("usr_tkn");
var submit_ask = document.getElementById("submitAsk");
var user_id = localStorage.getItem("id_session");
var management_id = localStorage.getItem("management_session");
var getTime = date_.toLocaleString();
var setImage = document.getElementById("image-button");

var setUrlImage;
submit_ask.addEventListener("click", async function setAsk(e){
    const formData = new FormData();
    formData.append('file', setImage.files[0]);
    formData.append('url', 'filename');
    try {
        await fetch("http://localhost:8080/upload",{
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
        await fetch("http://localhost:8080/modules/departments/asks", {
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
                client: { id: e },
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